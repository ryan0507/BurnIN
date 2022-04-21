db = {
    'user'     : 'root',
    'password' : 'wlsdn12450',
    'host'     : 'localhost',
    'port'     : 3306,
    'database' : 'burnin'
}

DB_URL = f"mysql+mysqlconnector://{db['user']}:{db['password']}@{db['host']}:{db['port']}/{db['database']}?charset=utf8"
