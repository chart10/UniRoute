import React, { useState } from 'react';
import axios from 'axios';
import useToken from '../UseToken';
import { useNavigate } from 'react-router-dom';



function Login() {
  const { setToken } = useToken()
  const navigate = useNavigate()
  // create React hook for login data, and act of logging in
  const [loginForm, setloginForm] = useState({
    username: '',
    password: '',
  });
  // Login function that uses axios to speak to backend
  function logMeIn(event) {
    axios({
      method: 'POST',
      url: '/token',
      data: {
        username: loginForm.username,
        password: loginForm.password,
      },
    })
      .then((response) => {
        // adds the login token authentication to the local storage
        setToken(response.data.access_token);
        navigate("/Profile");
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
    // uses react hook to set the login data
    setloginForm({
      username: '',
      password: '',
    });

    event.preventDefault();
  }

  // handles the chanages to the login form when typing
  function handleChange(event) {
    const { value, name } = event.target;
    setloginForm((prevNote) => ({
      ...prevNote,
      [name]: value,
    }));
  }

  // render the login form if the user is not logged in
  return (
    <div>
      <h2>Login</h2>
      <form className='login'>
        <input
          onChange={handleChange}
          type='username'
          text={loginForm.username}
          name='username'
          placeholder='Username'
          value={loginForm.username}
        />
        <input
          onChange={handleChange}
          type='password'
          text={loginForm.password}
          name='password'
          placeholder='Password'
          value={loginForm.password}
        />
        <button onClick={logMeIn}>Submit</button>
      </form>
    </div>
  );
}

export default Login;
