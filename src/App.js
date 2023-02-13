import React, { useState, useEffect } from 'react';
import './App.css';
import { Register } from './components/pages/Register';
import Login from './components/pages/Login';
import useToken from './components/UseToken';

function App() {
  const [currentForm, setCurrentForm] = useState('login');

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  }

  useState(() => {
    // front end to backend fetch command.
    // references the /time route in api.py
    fetch('/time').then(res => res.json()).then(data => {
      setCurrentTime(data.time);
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
      </header>
      {
        currentForm === "login" ? <Login onFormSwitch={toggleForm} /> : <Register onFormSwitch={toggleForm} />
      }
    </div>
    
  );
}

export default App;