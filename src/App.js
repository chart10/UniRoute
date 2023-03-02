import React from 'react';
import './App.css';
import Map from './components/Map';
import Logout from './components/Logout';

function App(props) {
  //const [directions, setDirections] = useOutletContext();
  return (
    <div className='App'>
      <header className='App-header'></header>
      <Logout />
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