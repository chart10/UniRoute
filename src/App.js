import React, { useState, useEffect } from 'react';
import './App.css';
import { Register } from './components/pages/Register';
import Login from './components/pages/Login';
import useToken from './components/UseToken';

function App() {
  const { token, removeToken, setToken } = useToken();
  return (
    <div className="App">
      <header className="App-header">
      </header>
      {
      }
    </div>
    
  );
}

export default App;