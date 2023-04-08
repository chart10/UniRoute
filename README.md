# Uniroute: Map Routing System for Students

The project has been created by: Chandler Dugan, Christian Hart, and Eric Rivas

## Initial Setup

### To use this app you will need a Google Maps API Key

If you have been provided a key by the UniRoute developers, move on to the next section.
Otherwise, follow the directions for getting your own API key from Google Maps Platform documentation here: https://developers.google.com/maps/get-started#create-project
(Note: you will need a Google account to get started. Billing information is required, but the service is free for the first 90 days)

### Before you get started, you need to install some dependencies in your environment.

1. First open up two terminals in your coding environment
2. In your first terminal, navigate to the api folder and create your python virtual environment:

```
$ python3 -m venv venv
$ source venv/bin/activate
```

3. Activate your python environmet and type in this install command: `pip install -r requirementsFlask.txt`
4. In your second terminal make sure you have node and npm installed.
5. To install your React modules use the following command:
   `npm install react react-icons react-router-dom axios @react-google-maps/api`
6. Make sure to add the .env file that was emailed. It will include not only the google maps API key, but also the credentials to access the UniRoute database.
7. In your your python environment in first terminal, start your backend with `flask run`, and in the second terminal start up your React frontend with `npm start`.

## When using the app

From the main page you can enter any address or location into the origin and destination inputs to get a route to anywhere you would like. You can also choose your prefered mode of travel from the dropdown menu.

For a quick example of the feature set we have implemented so far, select 'Login' and enter 'student' and 'uniroute' as your username and password. This will allow you to use the addresses already saved to this account to create a new route.

But to use the full features of the app, we encourage you to register your own account and log in. This will allow you to save addresses to your profile and use them to generate new routes.

## Deployment

- Run npm run build to get a production build of the frontend

- Docker to create an image of the Flask server with frontend build in Flask directory

- used `fly launch` to deplay
