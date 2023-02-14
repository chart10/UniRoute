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