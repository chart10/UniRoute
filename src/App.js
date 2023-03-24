import React from 'react';
import PropTypes from 'prop-types';
import './App.css';
import Map from './components/Map';
import Logout from './components/Logout';

function App(props) {
  return (
    <div className='App'>
      <header className='App-header'>foo</header>
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

App.propTypes = {
  directions: PropTypes.object,
  setDirections: PropTypes.func,
  directionsRequest: PropTypes.object,
  setDirectionsRequest: PropTypes.func,
};

export default App;
