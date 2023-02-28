import React, { useState } from 'react';
import axios from "axios";

function Login() {
    // create React hook for login data, and act of logging in
    const [loginForm, setloginForm] = useState({
        username: "",
        password: ""
    })
    // create React hook for tracking the login status
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    // Login function that uses axios to speak to backend
    function logMeIn(event) {
        axios({
            method: "POST",
            url: "/token",
            data:{
                username: loginForm.username,
                password: loginForm.password
            }    
        }).then((response) => {
            // adds the login token authentication to the local storage
            localStorage.setItem('token', response.data.access_token)
             // set isLoggedIn to true when the user is logged in
             setIsLoggedIn(true);
        }).catch((error) => {
            if (error.response) {
                console.log(error.response)
                console.log(error.response.status)
                console.log(error.response.headers)
            }
        })
        // uses react hook to set the login data
        setloginForm(({
            username: "",
            password: ""}))

        
        event.preventDefault();
    }

    // Logout function
    function logMeOut() {
        // uses axios post request to logout on server side
        axios({
            method: "POST",
            url: "/logout"
        }).then((response) => {
            // remove auth token so user cannot access data anymore
            localStorage.removeItem('token')
            // set isLoggedIn to false when the user is logged out
            setIsLoggedIn(false);
        }).catch((error) => {
            console.log(error.response)
            console.log(error.response.status)
            console.log(error.response.headers)
        })
    }

    // handles the chanages to the login form when typing
    function handleChange(event) {
        const {value, name} = event.target
        setloginForm(prevNote => ({
            ...prevNote, [name]: value})
        )}

    // render the login form if the user is not logged in
    if (!isLoggedIn) {
        return (
            <div>
                <h2>Login</h2>
                <form className="login">
                    <input onChange={handleChange}
                        type = "username"
                        text={loginForm.username}
                        name="username"
                        placeholder='Username'
                        value={loginForm.username} 
                    />
                    <input onChange={handleChange}
                        type="password"
                        text={loginForm.password}
                        name="password"
                        placeholder='Password'
                        value={loginForm.password} 
                    />
                    <button onClick={logMeIn}>Submit</button>
                </form>
            </div>
        );
    }

    // render the logout button if the user is logged in
    return (
        <div>
            <h2>Welcome, User!</h2>
            <button onClick={logMeOut}>Logout</button>
        </div>
    );
}

export default Login;