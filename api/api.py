import time
from flask import Flask

app = Flask(__name__)

#PLACEHOLDER ROUTE
@app.route('/time')
def get_current_time():
    return {'time': time.time()}