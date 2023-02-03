import time

from flask import Flask
import json from flask
import Flask
import request
import jsonify from datetime
import datetime
import timedelta
import timezonefrom flask_jwt_extended
import create_access_token
import get_jwt
import get_jwt_identity
import unset_jwt_cookies
import jwt_required
import JWTManager

app = Flask(__name__)


from flask import Flask, request, jsonify
from dotenv import find_dotenv, load_dotenv
import os
from flask_mysqldb import MySQL # Connects MySQL to Flask

app = Flask(__name__)

# DATABASE CONFIGURATION
app.config['MYSQL_HOST'] = os.getenv('MYSQL_HOST')
app.config['MYSQL_USER'] = os.getenv('MYSQL_USER')
app.config['MYSQL_PASSWORD'] = os.getenv('MYSQL_PASSWORD')
app.config['MYSQL_DB'] = os.getenv('MYSQL_DB')
mysql = MySQL(app)


# Add user information to the database
# Basics on how to communicate with MySQL in 5 easy steps
@app.route('/add_user', methods=['POST'])
def add_user():
    # 1) Create a cursor
    cursor = mysql.connection.cursor()
    # 2) Declare variables for input values, if needed
    username = request.json.get("username", None)
    password = request.json.get("password", None)
    university = request.json.get("univerity", None)
    firstName = request.json.get("firstName", None)
    lastName = request.json.get("lastName", None)
    # 3) Use cursor.execute() to run a line of MySQL code
    cursor.execute('''INSERT INTO users VALUES(%s,%s,%s,%s,%s)''',
                   (username,password,university,firstName,lastName))
    # 4) Commit the change to the MySQL database
    mysql.connection.commit()
    # 5) Close the cursor
    cursor.close()
    return 'successfully added user to database'
    
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
