import React, { useState } from 'react';
import axios from "axios";

export const Login = (props) => {
    /** Initial email and password will be empty*/
    const [email, setEmail] = useState('');
    const [password, setPass] = useState('');
  /** */
    const handleSubmit = (e) => {
        /** To prevent if the page gets reloaded not lose our state*/
        e.preventDefault();
        console.log(email,password);
    }
  
    return (
        <div className="auth-form-container">
            <h2>Login</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                <label htmlFor="email">email</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)}type="email" placeholder="youremail@gmail.com" id="email" name="email" />
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
