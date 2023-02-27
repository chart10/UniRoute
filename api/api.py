import json 
from flask import Flask
from datetime import datetime, timedelta, timezone
from flask_jwt_extended import create_access_token,get_jwt,get_jwt_identity, \
                               unset_jwt_cookies,jwt_required,JWTManager

app = Flask(__name__)


from flask import Flask, request, jsonify
from dotenv import find_dotenv, load_dotenv
import os
import logging
from flask_mysqldb import MySQL # Connects MySQL to Flask
import MySQLdb.cursors


app = Flask(__name__)

# TOKEN CONFIG
app.config["JWT_SECRET_KEY"] = "please-change-me"
jwt = JWTManager(app)

# DATABASE CONFIGURATION
app.config['MYSQL_HOST'] = 'localhost'#os.getenv('MYSQL_HOST')
app.config['MYSQL_USER'] = 'root'#os.getenv('MYSQL_USER')
app.config['MYSQL_PASSWORD'] = 'Drontionivon@123'#os.getenv('MYSQL_PASSWORD')
app.config['MYSQL_DB'] = 'UniRouteDb'#os.getenv('MYSQL_DB')
mysql = MySQL(app)

# LOGGING CONFIGURATION
log = logging.getLogger("writing-logger")
#logging.basicConfig(level=os.environ.get)()
log.setLevel(logging.INFO)
fh = logging.FileHandler("./mylog.log")
formatting = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
fh.setFormatter(formatting)
log.addHandler(fh)

@app.route('/')
def index():
    log.info("Hello, world!")    
    return "logging Hello World"

# Add user information to the database
# Basics on how to communicate with MySQL in 5 easy steps
@app.route('/register', methods=['POST'])
def add_user():
    # 1) Create a cursor
    cursor = mysql.connection.cursor()
    
    # 2) Declare variables for input values, if needed
    # Use input json to populate these variables
    username = request.json["username"]
    password = request.json["password"]
    email = request.json["email"]
    university = request.json["university"]
    firstName = request.json["firstName"]
    lastName = request.json["lastName"]

    # Check if username is already in the database
    cursor.execute('SELECT username FROM users WHERE username = %s', [username])
    user = cursor.fetchone()
    if user:
        return 'There is already an account with that username.'

    # 3) Use cursor.execute() to run a line of MySQL code

    cursor.execute('''INSERT INTO users VALUES(%s,%s,%s,%s,%s,%s)''',
                (username,password,email,university,firstName,lastName))
    # 4) Commit the change to the MySQL database
    mysql.connection.commit()
    # 5) Close the cursor
    cursor.close()
    return 'successfully added user to database'

# Api route for logging in users and creating token
@app.route('/token', methods=["POST"])
def create_token():
    # request json of username and pass from front end
    username = request.json.get("username", None)
    password = request.json.get("password", None)

    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute('SELECT * FROM users WHERE username = %s AND password = %s', (username, password,))
    user = cursor.fetchone()
    # if the user name and pass are not in db, return wrong username and pass 
    if user['username'] != username or user['password'] != password:
        return {"msg": "Wrong username or password"}, 401
    
    # create accesstoken if succsesful
    access_token = create_access_token(identity=username)
    response = {"access_token":access_token}
    return response

# this refreshes the jwt authentication so it does not randomly log you out
@app.after_request
def refresh_expiring_jwts(response):
    try: 
        exp_timestamp = get_jwt()["expt"]
        now = datetime.now(timezone.utc)
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
# jwt_required() means that you must be logged in (authenticated) to access it
# return type: dict of user data {FirstName: '', 
#                                 LastName: '', 
#                                 University: ''}
@app.route('/profile', methods=['GET', 'POST'])
@jwt_required()
def get_profile():
    current_user = get_jwt_identity()

    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute('SELECT * FROM users WHERE username = %s', (current_user,))
    user = cursor.fetchone()

    profile_data={
        'firstName': user['firstName'],
        'lastName': user['lastName'],
        'university': user['university']
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