import time
import json 
from flask import Flask
from datetime import datetime, timedelta, timezone
from flask_jwt_extended import create_access_token,get_jwt,get_jwt_identity, \
                               unset_jwt_cookies,jwt_required,JWTManager

app = Flask(__name__)


from flask import Flask, request, jsonify
from dotenv import find_dotenv, load_dotenv
import os
from flask_mysqldb import MySQL # Connects MySQL to Flask

app = Flask(__name__)

# TOKEN CONFIG
app.config["JWT_SECRET_KEY"] = "please-change-me"
jwt = JWTManager(app)

# DATABASE CONFIGURATION
app.config['MYSQL_HOST'] = os.getenv('MYSQL_HOST')
app.config['MYSQL_USER'] = os.getenv('MYSQL_USER')
app.config['MYSQL_PASSWORD'] = os.getenv('MYSQL_PASSWORD')
app.config['MYSQL_DB'] = os.getenv('MYSQL_DB')
mysql = MySQL(app)


# Add user information to the database
# Basics on how to communicate with MySQL in 5 easy steps
@app.route('/register', methods=['POST'])
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

#PLACEHOLDER ROUTE
@app.route('/time')
def get_current_time():
    return {'time': time.time()}

# Api route for logging in users
'''
@app.route('/login', methods=['GET', 'POST'])
def login():
    # Output message if something goes wrong
    msg = ''
    # Check if "username" and "password" POST requests exist (user submitted form)
    if request.method == 'POST' and 'username' in request.form and 'password' in request.form:
        # Create variables for easy access
        username = request.form['username']
        password = request.form['password']
        # Check if account exists using MySQL
        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        cursor.execute(
            'SELECT * FROM accounts WHERE username = %s AND password = %s', (username, password,))
        # Fetch one record and return result
        account = cursor.fetchone()
        # If account exists in accounts table in out database
        if account:
            # Create session data, we can access this data in other routes
            session['loggedin'] = True
            session['id'] = account['id']
            session['username'] = account['username']
            # Redirect to home page
            return 'Logged in successfully!'
        else:
            # Account doesnt exist or username/password incorrect
            msg = 'Incorrect username/password!'
    # Show the login form with message (if any)
    return render_template('index.html', msg=msg)
'''

@app.route('/token', methods=["POST"])
def create_token():
    username = request.json.get("username", None)
    password = request.json.get("passwrod", None)
    if username != "test: grab from db" or password != "test: grab from db":
        return {"msg": "Wrong username or password"}, 401
    
    access_token = create_access_token(identity=username)
    response = {"access_token": access_token}
    return response

@app.after_request
def refresh_expiring_jwts(response):
    try: 
        exp_timestamp = get_jwt()["expt"]
        now = datetime.nw(timezone.utc)
        target_timestamp = datetime.timestamp(now + timedelta(minutes=30))
        if target_timestamp > exp_timestamp:
            access_token = create_access_token(identity=get_jwt_identity())
            data = response.get_json()
            if type(data) is dict:
                data["access_token"] = access_token
                response.data = json.dumps(data)
            return response
    except (RuntimeError, KeyError):
        # case where there is not a valid JWT. Just return the original response
        return response

# Api route for loggin out users
@app.route('/logout', methods=['POST'])
def logout():
    response = jsonify({"msg": "logout successful"})
    unset_jwt_cookies(response)
    return response

# Api route to grab user data
# return type: dict of user data {FirstName: '', 
#                                 LastName: '', 
#                                 University: ''}
@app.route('/profile', methods=['GET', 'POST'])
@jwt_required()
def get_profile():
    # dummy data
    # will need to replace this data wiht a db query
    profile_data={
        'firstName': "Chandler",
        'lastName': "Dugan",
        'university': "GSU"
    }
    return profile_data

# Api route to grab google routing data
@app.route('/google')
def get_google_route():
    # Will call foogle routes from a handler file 
    return "PLACE HOLDER FOR GOOGLE ROUTE API DATA"

# Api route to grab marta train data
@app.route('/marta')
def get_marta_data():
    return "PLACE HOLDER FOR MARTA TRAIN DATA"

@app.route('/schedule')
def get_schedule():
    return "PLACEHOLDER FOR MARTA TRAIN DATA"