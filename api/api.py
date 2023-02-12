import time

from flask import Flask

app = Flask(__name__)


from flask import Flask, request, jsonify
from dotenv import find_dotenv, load_dotenv
import os
import logging
from flask_mysqldb import MySQL # Connects MySQL to Flask


app = Flask(__name__)

# DATABASE CONFIGURATION
app.config['MYSQL_HOST'] = os.getenv('MYSQL_HOST')
app.config['MYSQL_USER'] = os.getenv('MYSQL_USER')
app.config['MYSQL_PASSWORD'] = os.getenv('MYSQL_PASSWORD')
app.config['MYSQL_DB'] = os.getenv('MYSQL_DB')
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
@app.route('/signup', methods=['GET','POST'])
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
                (username,password,university,firstName,lastName,email))
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

# Api route for loggin out users
@app.route('/logout', methods=['GET', 'POST'])
def logout():
    return "PLACE HOLDER FOR LOGOUT"

# Api route to grab user data
# return type: dict of user data {FirstName: '', 
#                                 LastName: '', 
#                                 University: ''}
@app.route('/profile')
def get_profile():
    profile_data={
        'firstName': "Chandler",
        'lastName': "Dugan",
        'university': "GSU"
    }
    return profile_data

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