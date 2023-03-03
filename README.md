# Uniroute: Map Routing System for Students
The project has been created by: Chandler Dugan, Christian Hart, and Eric Rivas
## Initial Setup
### Before you get started, you need to install some dependencies in your environment. 
1. First open up two terminals in your coding environment
2. In your first terminal, navigate to the api folder and create your python virtual environment
3. In your second terminal make sure you have node and npm installed
4. Activate your python environmet in the first Terminal and type in this install command: 'pip install -r requirementsFlask.txt'
5. In the other terminal type in this install command: 'npm install react react-icons react-router-dom axios google-maps-react'
6. Make sure to add the .env file that was emailed. It will include not only the google maps api key, but also the AWS MySQL DB host, user, and password.
7. After that in your python environment start you backend with 'flask run' and in the other terminal start up react with 'npm start' 
## When using the app
To use the full features, be sure to log in. This will allow you to save your addresses and use them in GetRoute. One side note: There is a strange bug on the first route query. The window pops up, but does not fill it with route data. To fix this jsut call the route a second time and subsequent routes will work as normal. Other than that, I hope you enjoy using it!