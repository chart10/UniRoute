import unittest
from flask import json
from api import app, mysql
from flask_mysqldb import MySQL
import os

class TestAddUser(unittest.TestCase):
    def setUp(self):
        ''' Mockup Database'''
        app.config['TESTING'] = True
        self.app = app.test_client()

    def test_add_user(self):
        ''' Tests if adding a user is succesful.
            Tests if a user tries to add a duplicate username.    
        '''
        # test adding a user with unique username
        response = self.app.post('/register', json={
            'username': 'testuser',
            'password': 'testpass',
            'email': 'testuser@example.com',
            'university': 'Test University',
            'firstName': 'Test',
            'lastName': 'User'
        })
        self.assertEqual(response.status_code, 200)
        self.assertIn(b'successfully added user to database', response.data)

        # test adding a user with duplicate username
        response = self.app.post('/register', json={
            'username': 'testuser',
            'password': 'testpass2',
            'email': 'testuser2@example.com',
            'university': 'Test University',
            'firstName': 'Test',
            'lastName': 'User 2'
        })
        self.assertEqual(response.status_code, 200)
        self.assertIn(b'There is already an account with that username.', response.data)

    def tearDown(self):
        '''Deletes the test user from the database'''
        # delete the test user from the database
        response = self.app.post('/delete_user', json= {
            'username': 'testuser'
        })

  
class TestCreateToken(unittest.TestCase):
    def setUp(self):
        ''' Mockup Database and test user '''
        app.config['TESTING'] = True
        self.app = app.test_client()

        response = self.app.post('/register', json={
            'username': 'testuser',
            'password': 'testpassword',
            'email': 'testuser2@example.com',
            'university': 'Test University',
            'firstName': 'Test',
            'lastName': 'User 2'
        })

    def test_create_token_success(self):
        ''' Test when a valid user signs in. should return an access token'''
        response = self.app.post('/token', json={
            "username": "testuser",
            "password": "testpassword"
        })
        self.assertEqual(response.status_code, 200)
        self.assertIn('access_token', response.json)

    def test_create_token_failure(self):
        ''' Test when an invalid user signs in. Should return the error response '''
        response = self.app.post('/token', data=json.dumps({
            "username": "wronguser",
            "password": "wrongpassword"
        }), content_type='application/json')
        self.assertEqual(response.status_code, 401)
        self.assertIn('Wrong username or password', response.json['msg'])

    def tearDown(self):
        ''' Delete the test user. '''
        # delete the test user from the database
        response = self.app.post('/delete_user', json= {
            'username': 'testuser'
        })

def run_tests(): 
    ''' runs tests only in the specified classes. '''
    test_classes_to_run = [TestAddUser, TestCreateToken]

    loader = unittest.TestLoader()

    suites_list = []
    for test_class in test_classes_to_run:
        suite = loader.loadTestsFromTestCase(test_class)
        suites_list.append(suite)
    
    big_suite = unittest.TestSuite(suites_list)

    runner = unittest.TextTestRunner()
    results = runner.run(big_suite)

if __name__ == '__main__':
    run_tests()