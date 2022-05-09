import jwt
import bcrypt
from flask import Flask, jsonify, current_app, Response, request, g
from flask.json import JSONEncoder
from sqlalchemy import create_engine, text
from datetime   import datetime, timedelta
from functools  import wraps
import datetime

class CustomJSONEncoder(JSONEncoder):
    def default(self, obj):
        if isinstance(obj, set):
            return list(obj)

        return JSONEncoder.default(self, obj)

def insert_user(user):
    return current_app.database.execute(text("""
        INSERT INTO user (
            passwd,
            nickname,
            height,
            weight,
            photo,
            age
        ) VALUES (
            :password,
            :nickname,
            :height,
            :weight,
            :photo,
            :age
        )
    """), user).lastrowid

def insert_run_data(record):
    return current_app.database.execute(text("""
        INSERT INTO runinfo (
             id,
             user_id,
             created_at,
             time_record,
             distance  
        ) VALUES (
            :id,
            :user_id,
            :created_at,
            :time_record,
            :distance
        )
    """), record)

def get_user(user_id):
    user = current_app.database.execute(text("""
        SELECT
            id,
            nickname,
            height,
            weight,
            age,
            photo
        FROM user
        WHERE nickname = :user_id   
    """), {
        'user_id' : user_id
    }).fetchone()

    return {
        'id': user['id'],
        'nickname': user['nickname'],
        'height': user['height'],
        'weight': user['weight'],
        'age': user['age'],
    } if user else None

def get_user_id_and_password(email):
    row = current_app.database.execute(text("""    
        SELECT
            id,
            passwd
        FROM user
        WHERE email = :email
    """), {'email' : email}).fetchone()

    return {
        'id'     : row['id'],
        'passwd' : row['passwd']
    } if row else None

def create_app(test_config = None):
    app = Flask(__name__)
    app.json_encoder = CustomJSONEncoder

    if test_config is None:
        app.config.from_pyfile("config.py")
    else:
        app.config.update(test_config)

    database     = create_engine(app.config['DB_URL'], encoding = 'utf-8', max_overflow = 0)
    app.database = database

    @app.route("/ping", methods=['GET'])
    def ping():
        return "pong"

    @app.route("/sign-up", methods=['POST', 'GET'])
    def sign_up():
        if request.method == 'POST':
            new_user = request.json
            user_id= insert_user(new_user)
            new_user = get_user(user_id)

            return jsonify(new_user)

        ## JUST for check data

        elif request.method == 'GET':
            return get_user('eee')

    @app.route("/nickname-check", methods = ['POST'])
    def duplicate():
        if request.method == 'POST':
            cur_request = request.json
            is_duplicate : bool = get_user(cur_request['nickname']) is not None

            # When exist: 404, not exist: 200
            if is_duplicate:
                return '', 404
            else:
                return '', 200

    @app.route('/login', methods=['POST'])
    def login():
        credential = request.json
        email = credential['nickname']
        password = credential['passwd']
        user_credential = get_user_id_and_password(email)

        if user_credential and bcrypt.checkpw(password.encode('UTF-8'),
                                              user_credential['hashed_password'].encode('UTF-8')):
            user_id = user_credential['id']
            payload = {
                'user_id': user_id,
                'exp': datetime.utcnow() + timedelta(seconds=60 * 60 * 24)
            }
            token = jwt.encode(payload, app.config['JWT_SECRET_KEY'], 'HS256')

            return jsonify({
                'access_token': token.decode('UTF-8')
            })
        else:
            return '', 401

    return app


    @app.route('/race-finish', methods=['POST'])
    def post_info():
        user_id = request.headers.get('user_id')
        user = get_uesr(user_id)

        # TODO: Should be modified with changed DB structure        
        cur_id = user['id']
        user_id = user['nickname']
        info = request.json
        dist = info['distance']
        time = info['time']
        calories = info['calories']
        paces = info['paces']
        
        record = {
            'id': cur_id,
            'user_id': user_id,
            'created_at' : datetime.datetime.now().timestamp,
            'time_record' : time,
            'distance' : dist
        }

        insert_run_data(record)

        return '', 200


#########################################################
#       Decorators
#########################################################
def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        access_token = request.headers.get('Authorization')
        if access_token is not None:
            try:
                payload = jwt.decode(access_token, current_app.config['JWT_SECRET_KEY'], 'HS256')
            except jwt.InvalidTokenError:
                 payload = None

            if payload is None: return Response(status=401)

            user_id   = payload['user_id']
            g.user_id = user_id
            g.user    = get_user(user_id) if user_id else None
        else:
            return Response(status = 401)

        return f(*args, **kwargs)
    return decorated_function