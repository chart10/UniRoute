import time
from flask import Flask

app = Flask(__name__)

#PLACEHOLDER ROUTE
@app.route('/time')
def get_current_time():
    return {'time': time.time()}

# Api route for logging in users
@app.route('/login', methods=['GET', 'POST'])
def login():
    return "PLACE HOLDER FOR LOGIN"

# Api route for loggin out users
@app.route('/logout', methods=['GET', 'POST'])
def logout():
    return "PLACE HOLDER FOR LOGOUT"

# Api route to grab user data
@app.route('/profile')
def get_profile():
    return "PLACE HOLDER FOR PROFILE INFO"

# Api route to grab google routing data
@app.route('/google')
def get_google_route():
    return "PLACE HOLDER FOR GOOGLE ROUTE API DATA"

# Api route to grab marta train data
@app.route('/marta')
def get_marta_data():
    return "PLACE HOLDER FOR MARTA TRAIN DATA"

@app.route('/schedule')
def get_schedule():
    return "PLACEHOLDER FOR MARTA TRAIN DATA"