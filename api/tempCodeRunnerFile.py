cursor.execute('SELECT * FROM users WHERE username =%s', (username))
    user = cursor.fetchone()
    if user:
        return 'There is already an account with that username.'
