import json
import sys
import jwt
import bcrypt
from flask import Flask, jsonify, current_app, Response, request, g
from flask.json import JSONEncoder
from sqlalchemy import create_engine, text
from datetime   import datetime, timedelta
from functools  import wraps
import datetime
import base64

class CustomJSONEncoder(JSONEncoder):
    def default(self, obj):
        if isinstance(obj, set):
            return list(obj)

        return JSONEncoder.default(self, obj)

def insert_user(user):
    current_app.database.execute(text("""
        INSERT INTO user (
            id,
            passwd,
            height,
            weight,
            photo
        ) VALUES (
            :id,
            :passwd,
            :height,
            :weight,
            null
        )
    """), user)
    return user['id']

def insert_run_data(record):
    return current_app.database.execute(text("""
        INSERT INTO runinfo (
             user_id,
             time_record,
             pace_1,
             pace_2,
             pace_3,
             distance,
             calories
        ) VALUES (
            :user_id,
            :time_record,
            :pace_1,
            :pace_2,
            :pace_3,
            :distance,
            :calories
        )
    """), record)

def get_user(user_id):
    user = current_app.database.execute(text("""
        SELECT
            id,
            height,
            weight,
            photo
        FROM user
        WHERE id = :user_id   
    """),{
        'user_id' :user_id
    }).fetchone()

    return {
        'id': user['id'],
        'height': user['height'],
        'weight': user['weight']
    } if user else None

def run_info_check(user_id):
    user = current_app.database.execute(text("""
            SELECT
                time_record
            FROM runinfo
            WHERE user_id = :user_id   
        """), {
        'user_id': user_id
    }).fetchone()

    return {
        'time_record': user['time_record']
    } if user else None

def get_current_user_rank(user_id):
    current_user = current_app.database.execute(text("""
        select 
            user_id as nickname, 
            race_rank, 
            pace_3 as record
        from (
        select 
            user_id,  
            pace_3,
            rank() over(order by min(pace_3) asc) as race_rank
        from runinfo
        where pace_3 > 0
        group by user_id, pace_3
        order by min(pace_3)) as r
        where user_id = :user_id
        limit 1;
    """),{'user_id':user_id
    })

    return jsonify([dict(c) for c in current_user][0])#, ensure_ascii = False)

def get_top10_rank():
    total_rank = current_app.database.execute(text("""
        select 
            user_id as nickname, 
            rank() over(order by min(pace_3) asc) as race_rank,
            min(pace_3) as record
        from runinfo
        where pace_3 > 0
        group by user_id
        order by race_rank
        limit 10;
    """))
    return jsonify([dict(t) for t in total_rank])#, ensure_ascii = False)

def get_numUser_avg():
    num = current_app.database.execute(text("""
        select count(distinct user_id) as participant
            from runinfo
            where pace_3 > 0;
    """))

    avg = current_app.database.execute(text("""
        select avg(pace_3) as average
        from (
            select *, rank() over(partition by r.user_id order by r.pace_3 asc) as rn
            from runinfo as r where pace_3 > 0) as ranking
        where ranking.rn = 1;
    """))
    json_data = {}
    a = [dict(n) for n in num][0]
    b = [dict(a) for a in avg][0]
    json_data['participant'] = a['participant']
    json_data['average'] = b['average']
    return json_data

def get_rank(user_id):
    rank = current_app.database.execute(text("""
        select 
            user_id,
            race_rank, 
            race_rank - 1 as rank_up,
            diff
        from(select 
            rank() over(order by pace_3 asc) as race_rank, 
            user_id, 
            pace_3, 
            lag(pace_3) over (order by pace_3 asc) as rank_up,
            (pace_3 - lag(pace_3) over (order by pace_3 asc)) as diff
            from runinfo
            where pace_3 > 0
            group by user_id, pace_3
            order by race_rank) as r
        where user_id = :user_id
        limit 1;
    """),{'user_id':user_id
    })
    return jsonify([dict(r) for r in rank][0])

def mypace_check(user_id):
    record = current_app.database.execute(text("""
        select 
            (pace_3 - lead(pace_3) over (order by created_at desc)) as diff
        from runinfo
        where user_id = :user_id and pace_3 > 0
        order by created_at desc
        limit 1;
    """),{'user_id':user_id
    })

    check = current_app.database.execute(text("""
        select 
            (pace_1 - lead(pace_1) over (order by created_at desc)) as pace1_diff, 
            ((pace_2 - pace_1) - lead(pace_2 - pace_1) over (order by created_at desc)) as pace2_diff, 
            ((pace_3-pace_2) - lead(pace_3-pace_2) over (order by created_at desc)) as pace3_diff
        from runinfo
        where user_id = :user_id and pace_3 > 0
        order by created_at desc 
        limit 1;
        """), {'user_id': user_id
    })

    json_data = {}
    a = [dict(n) for n in record][0]
    b = [dict(a) for a in check][0]
    json_data['diff'] = a['diff']
    json_data['pace1_diff'] = b['pace1_diff']
    json_data['pace2_diff'] = b['pace2_diff']
    json_data['pace3_diff'] = b['pace3_diff']
    return json_data

def graph_line():
    graph = current_app.database.execute(text("""
        select created_at, pace_3
            from runinfo
            where pace_3 > 0
            order by created_at

    """))
    return jsonify([dict(g) for g in graph][0])


def graph_bar():
    graph = current_app.database.execute(text("""
        WITH RECURSIVE TEMP AS (
            SELECT 0 AS HOUR
            UNION ALL
            SELECT HOUR+1 FROM TEMP
            WHERE HOUR<23
        )
        select hour, count(case when pace_3 > 0 then hour(created_at) end) as cnt
        from TEMP
        left join runinfo as r on TEMP.hour = hour(r.created_at) 
        group by hour
        order by hour asc
    """))
    return jsonify([dict(g) for g in graph][0])

def user_data(user_id):
    data = current_app.database.execute(text("""
        select 
            round(sum(distance),2) as all_distance, 
            sum(time_record) as all_time, 
            count(*) as count_running,
            avg(time_record/distance) as avg_pace
        from runinfo
        where user_id = :user_id;

    """),{'user_id':user_id
    })
    return jsonify([dict(d) for d in data][0])

def best_record(user_id):
    dist = current_app.database.execute(text("""
        select 
            distance, 
            date_format(created_at, '%Y-%m-%d %H:%i') as created_at
        from runinfo
        where user_id = :user_id
        order by distance desc
        limit 1;
        """), {'user_id': user_id
    })

    pace = current_app.database.execute(text("""
        select 
            time_record/distance as pace,  
            date_format(created_at, '%Y-%m-%d %H:%i') as created_at
        from runinfo
        where user_id =:user_id
        order by time_record/distance asc
        limit 1;
            """), {'user_id': user_id
                   })

    record = current_app.database.execute(text("""
        select 
            time_record, 
            date_format(created_at, '%Y-%m-%d %H:%i') as created_at
        from runinfo
        where user_id = :user_id
        order by time_record asc
        limit 1;
                """), {'user_id': user_id
                       })

    json_data = {}
    a = [dict(d) for d in dist][0]
    b = [dict(p) for p in pace][0]
    c = [dict(r) for r in record][0]
    json_data['created_at_dist'] = a['created_at']
    json_data['distance'] = a['distance']
    json_data['created_at_pace'] = b['created_at']
    json_data['pace'] = b['pace']
    json_data['created_at_record'] = c['created_at']
    json_data['time_record'] = c['time_record']
    return json_data

def recent_7(user_id):
    data = current_app.database.execute(text("""
        select created_at, pace, round(distance,2) as distance
            from (
            select 
                created_at,
                ifnull(time_record/distance, 0) as pace,
              ifnull(distance,0) as distance
            from runinfo
            where user_id = :user_id
            order by created_at desc
            limit 7) as rn
            order by created_at asc;
                    """), {'user_id': user_id
                           })
    return jsonify([dict(d) for d in data][0])

def recent_data(user_id):
    data = current_app.database.execute(text("""
            select 
                date_format(created_at, '%Y-%m-%d %H:%i') as created_at, 3
                distance, 
                time_record/distance as pace,  
                calories
            from runinfo
            where user_id = :user_id
            order by created_at desc
            limit 2;
                """), {'user_id': user_id
                       })
    return jsonify([dict(d) for d in data][0])

def get_user_id_and_password_and_height_and_weight(email):
    row = current_app.database.execute(text("""    
        SELECT
            id,
            passwd,
            height,
            weight
        FROM user
        WHERE id = :email
    """), {'email' : email}).fetchone()

    return {
        'id'     : row['id'],
        'passwd' : row['passwd'],
        'height' : row['height'],
        'weight' : row['weight']
    } if row else None

def create_app(test_config = None):
    app = Flask(__name__)
    app.config['JSON_AS_ASCII'] = False
    app.json_encoder = CustomJSONEncoder

    if test_config is None:
        app.config.from_pyfile("config.py")
    else:
        app.config.update(test_config)

    database     = create_engine(app.config['DB_URL'], encoding = 'utf-8', max_overflow = 0, pool_size=50)
    app.database = database

    @app.route("/ping", methods=['GET'])
    def ping():
        return "pong"

    @app.route("/test", methods=['GET'])
    def test():
        #return get_current_user_rank("유저1")
        #return get_top10_rank()
        #return get_numUser_avg()
        #return get_rank("유저1")
        #return mypace_check("유저3")
        #return graph_bar()
        #return user_data("유저1")
        #return recent_data("유저1")
        """
        json_data = {}
        json_data['user_data'] = user_data('유저1').json
        json_data['best_record'] = best_record('유저1')
        json_data['recent_data'] = recent_data('유저1').json
        json_data['recent_7'] = recent_7('유저1').json
        json_data['get_rank'] = get_rank('유저1').json

        return jsonify(json_data)
        """

        record = {
            'user_id': "test1",
            'time_record': 1000,
            'pace_1': 350,
            'pace_2': 400,
            'pace_3': 370,
            'distance': 490.0,
            'calories': 366
        }

        insert_run_data(record)
        return "",200

    @app.route("/sign-up", methods=['POST', 'GET'])
    def sign_up():
        if request.method == 'POST':
            new_user = request.json
            
            # app.logger.error('%s', type(new_user['id']))
            # new_user['photo'] = new_user['photo']['base64']
            # app.logger.info('%s', new_user['photo'])
            
            new_user_id = insert_user(new_user)#.encode('utf-8')
            app.logger.info('%s', new_user_id)
            app.logger.info('%s', type(new_user_id))

            #return str(json.dumps(new_user_id))
            app.logger.info('%s', new_user['weight'])
            return '', 200

        ## JUST for check data
        elif request.method == 'GET':
            return get_user(1)

    @app.route('/u-ha', methods=['GET'])
    def uha():
        payload = request.headers
        for key, item in payload.items():
            app.logger.error('%s %s', key, item)
        payload = payload['Authorization']
        app.logger.error('%s', payload[6:].lstrip('"').rstrip('"'))
        user = jwt.decode(payload[6:].lstrip('"').rstrip('"'), app.config['JWT_SECRET_KEY'], algorithms='HS256')
        for key, item in user.items():
            app.logger.error('%s %s', key, item)
        
        id = user['user_id']
        app.logger.error('%s',id)
        json_data = {}
        json_data['numUser_avg'] = get_numUser_avg()
        json_data['mypace_check'] = mypace_check(id)
        json_data['graph_line'] = graph_line().json
        json_data['graph_bar'] = graph_bar().json
        json_data['get_rank'] = get_rank(id).json

        return jsonify(json_data)

    @app.route('/u-ha2', methods=['GET'])
    def uha2():
        payload = request.headers
        payload = payload['Authorization']
        user = jwt.decode(payload[6:].lstrip('"').rstrip('"'), app.config['JWT_SECRET_KEY'], algorithms='HS256')

        id = user['user_id']
        json_data = {}
        json_data['user_data'] = user_data(id).json
        json_data['best_record'] = best_record(id)
        json_data['recent_data'] = recent_data(id).json
        json_data['recent_7'] = recent_7(id).json
        return jsonify(json_data)



    @app.route("/nickname-check", methods = ['POST', 'GET'])
    def duplicate():
        cur_request = request.json
        is_duplicate = get_user(cur_request['id']) is not None
        app.logger.info('is_duplicate check: %s', is_duplicate)

        # When exist: 404, not exist: 200
        if is_duplicate:
            return 'YOU HAVE DUPLICATE NICKNAME', 404
        else:
            return f'{is_duplicate}', 200

    @app.route('/race-ranking', methods=['GET'])
    def race_ranking():
        return get_top10_rank()

    @app.route('/current-user-rank', methods=['GET'])
    def current_user_rank():
        payload = request.headers
        for key, item in payload.items():
            app.logger.error('%s %s', key, item)
        payload = payload['Authorization']
        app.logger.error('%s', payload[6:].lstrip('"').rstrip('"'))
        user = jwt.decode(payload[6:].lstrip('"').rstrip('"'), app.config['JWT_SECRET_KEY'], algorithms = 'HS256')
        if run_info_check(user['user_id']) is None:
            return "NO DATA YET", 404
        else:
            return get_current_user_rank(user['user_id'])

    @app.route('/race-finish', methods=['POST'])
    def post_info():
        payload = request.headers
        payload = payload['Authorization']
        user = jwt.decode(payload[6:].lstrip('"').rstrip('"'), app.config['JWT_SECRET_KEY'], algorithms='HS256')

        user_id = user['user_id']

        run_info = request.json
        time_record = run_info['time']
        pace_1 = run_info['pace_1']
        pace_2 = run_info['pace_2']
        pace_3 = run_info['pace_3']
        distance = run_info['distance']
        calories = run_info['calories']

        record = {
            'user_id': user_id,
            'time_record': time_record,
            'pace_1': pace_1,
            'pace_2': pace_2,
            'pace_3': pace_3,
            'distance': distance,
            'calories': calories
        }

        insert_run_data(record)

        return '', 200

    @app.route('/login', methods=['POST'])
    def login():
        credential = request.json
        email = credential['id']
        password = credential['passwd']
        user_credential = get_user_id_and_password_and_height_and_weight(email)

        if user_credential and password == user_credential['passwd']:
            payload = {
            'user_id': user_credential['id'],
            'exp': datetime.datetime.utcnow() + timedelta(seconds=60 * 60 * 24)
            }   
            
            token = jwt.encode(payload, app.config['JWT_SECRET_KEY'], 'HS256')

            return jsonify({
                'access_token': token,
                'height' : user_credential['height'],
                'weight' : user_credential['weight']
            })

        else:
            return 'Fucking Hackers', 401

    return app




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

"""
export FLASK_ENV=development
FLASK_ENV=1 FLASK_DEBUG=1 flask run
"""