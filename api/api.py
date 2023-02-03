import time
from flask import Flask

app = Flask(__name__)

# PLACEHOLDER ROUTE


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
