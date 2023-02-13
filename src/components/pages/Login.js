import React, { useEffect, useState } from 'react';
import axios from "axios";

export const Login = (props) => {
    /** Initial email and password will be empty*/
    //const [username, setUsername] = useState('');
    //const [password, setPass] = useState('');
    //const [user, setUser] = useState();

    const {loginForm, setloginForm} = useState({
        username: "",
        password: ""
    });

    function logMeIn(event) {
        axios({
            method: "POST",
            url: "/token",
            data:{
                username: loginForm.username,
                password: loginForm.password
            }
        })
        .then((response) => {
            props.setToken(response.data.access_token)
        }).catch((error) => {
            if (error.response) {
                console.log(error.response);
                console.log(error.response.status);
                console.log(error.response.headers);
            }
        })

        setloginForm(({
            username: "",
            password: ""
        }))

        event.preventDefault();
    };

    function handleChange(event) {
        const {value, name} = event.target;
        setloginForm(prevNote => ({
            ...prevNote, [name]: value})
        )}
    }

  /**
    const handleSubmit = async (e) => {
        /** To prevent if the page gets reloaded not lose our state
        e.preventDefault();
        const user = { email: username, password };
        // send the username and password to the server
        const response = await axios.post (
            "/login",
            user
        );
        // set the state of the user
        setUser(response.data);
        localStorage.setItem('user', response.data);
        console.log(response.data);
    };
    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        if (loggedInUser) {
            const foundUser = JSON.parse(loggedInUser);
            setUser(foundUser);
        }
    }, []);
    
    if (user) {
        return <div>{user.name} is logged in</div>
    }
  */ 

  
    
  
    return (
        <div className="auth-form-container">
            <h2>Login</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                <label htmlFor="email">email</label>
                <input value={username} onChange={(e) => setUsername(e.target.value)}type="email" placeholder="youremail@gmail.com" id="email" name="email" />
                <label htmlFor="password">password</label>
                <input value={password} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" />
                <button type="submit">Log In</button>
            </form>
            {/**If user doesn't have an account it directs them to register here */}
            <button className="link-btn" onClick={() => props.onFormSwitch('register')}>Don't have an account? Register here.</button>
        </div>
    )
  }
export default Login;
