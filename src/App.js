import React, { useState, useEffect } from 'react'
import './App.css'
import { RegisterForm } from './components/pages/Register'
import Login from './components/pages/Login'
import Map from './components/Map'

function App() {
  const [currentForm, setCurrentForm] = useState('login')

  const toggleForm = (formName) => {
    setCurrentForm(formName)
  }

  return (
    <div className='App'>
      <header className='App-header'></header>
      {currentForm === 'login' ? (
        <Login onFormSwitch={toggleForm} />
      ) : (
        <RegisterForm onFormSwitch={toggleForm} />
      )}
      <Map />
    </div>
  )
}

export default App
