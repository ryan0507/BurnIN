import logging
import sys
logging.basicConfig(stream=sys.stderr)
sys.path.insert(0, '/home/ybigta/backend/BurnIN')
from my_flask_app import app as application