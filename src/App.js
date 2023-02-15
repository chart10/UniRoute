import React, { useState, useEffect } from 'react'
import './App.css'
import { RegisterForm } from './components/pages/Register'
import Login from './components/pages/Login'
import Map from './components/Map'
import useToken from './components/UseToken';

function App() {
  const { token, removeToken, setToken } = useToken();
  return (
    <div className='App'>
      <header className='App-header'></header>
      {

      }
      <Map />
    </div>
  )
}

export default App