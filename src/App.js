import React, { useState, useEffect } from 'react';
import { Outlet, useOutletContext } from 'react-router-dom';
import './App.css';
import Map from './components/Map';

function App(props) {
  //const [directions, setDirections] = useOutletContext();
  return (
    <div className='App'>
      <header className='App-header'></header>
      <Map
        directions={props.directions}
        setDirections={props.setDirections}
        directionsRequest={props.directionsRequest}
        setDirectionsRequest={props.setDirectionsRequest}
      />
    </div>
  );
}

export default App;
