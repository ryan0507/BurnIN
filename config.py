db = {
    'user'     : 'root',
    'password' : 'wlsdn12450',
    'host'     : 'localhost',
    'port'     : 3306,
    'database' : 'burnin'
}

DB_URL = f"mysql+mysqlconnector://{db['user']}:{db['password']}@{db['host']}:{db['port']}/{db['database']}?charset=utf8"
JWT_SECRET_KEY = 'SOME_SUPER_SECRET_KEY'