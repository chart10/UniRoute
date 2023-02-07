import React, { useState, useEffect } from 'react'
import './App.css'
import { RegisterForm } from './components/pages/Register'
import Login from './components/pages/Login'

function App() {
  const [currentForm, setCurrentForm] = useState('login')

  const toggleForm = (formName) => {
    setCurrentForm(formName)
  }
  // placeholder stuff
  const [currentTime, setCurrentTime] = useState(0)

  useState(() => {
    // front end to backend fetch command.
    // references the /time route in api.py
    fetch('/time')
      .then((res) => res.json())
      .then((data) => {
        setCurrentTime(data.time)
      })
  }, [])

  return (
    <div className='App'>
      <header className='App-header'>
        <p> The Current time is {currentTime}.</p>
      </header>
      {currentForm === 'login' ? (
        <Login onFormSwitch={toggleForm} />
      ) : (
        <RegisterForm onFormSwitch={toggleForm} />
      )}
    </div>
  )
}

export default App
