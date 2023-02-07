import React, { useState } from 'react'
import Register from './apiRegister.js'

export const Form = (props) => {
  const [username, setUserName] = useState('')
  const [password, setPass] = useState('')
  const [university, setUniversity] = useState('')
  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')

  const insertArticle = () => {
    apiRegister
      .Register({ username, password, university, email, firstName, lastName })
      .then((response) => props.insertedArticle(response))
      .catch((error) => console.log('error', error))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(email)
    fetch('/time').then()
  }

  return (
    <div className='auth-form-container'>
      <h2>Register</h2>
      <form className='register-form' onSubmit={handleSubmit}>
        <label htmlFor='username'>Username</label>
        <input
          value={username}
          name='username'
          onChange={(e) => setUserName(e.target.value)}
          id='username'
          placeholder='Username'
        />

        <label htmlFor='password'>Password</label>
        <input
          value={password}
          onChange={(e) => setPass(e.target.value)}
          type='password'
          placeholder='********'
          id='password'
          name='password'
        />

        <label htmlFor='university'>University</label>
        <input
          value={university}
          name='university'
          onChange={(e) => setUniversity(e.target.value)}
          id='university'
          placeholder='University'
        />

        <label htmlFor='email'>email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type='email'
          placeholder='youremail@gmail.com'
          id='email'
          name='email'
        />

        <label htmlFor='firstName'>First Name</label>
        <input
          value={firstName}
          name='firstName'
          onChange={(e) => setFirstName(e.target.value)}
          id='firstName'
          placeholder='first Name'
        />

        <label htmlFor='lastName'>Last Name</label>
        <input
          value={lastName}
          name='lastName'
          onChange={(e) => setLastName(e.target.value)}
          id='lastName'
          placeholder='Last Name'
        />
        <button type='submit'>Submit Registration</button>
      </form>
      <button className='link-btn' onClick={() => props.onFormSwitch('login')}>
        Already have an account? Login here.
      </button>
    </div>
  )
}
