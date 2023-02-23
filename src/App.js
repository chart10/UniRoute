import React, { useState, useEffect } from 'react';
import './App.css';
import Map from './components/Map';

function App(props) {
  return (
    <div className='App'>
      <header className='App-header'></header>
      {}
      <Map route={props.route} />
    </div>
  );
}

export default App;
