import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import Map from '../Map';
// Component: Route Finder
// Contains the forms needed to run a route query
/*global google*/

function GetRoute(props) {
  // destructuring the outlet context from index.js
  const [directionsRequest, setDirectionsRequest] = useOutletContext();
  const [origin, setOrigin] = useState('atlanta');
  const [destination, setDestination] = useState('norcross');
  const [travelMode, setTravelMode] = useState('TRANSIT');

  // const apiGetrouteCall = () => {
  //   fetch('/get_route', {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     // body: JSON.stringify(props),
  //   })
  //     .then((response) => {
  //       console.log(response);
  //       //console.log(response.json());
  //       response.json().then((body) => {
  //         setDirections(body);
  //       });
  //     })
  //     // .then(console.log('fetched from api.py'))
  //     .catch((error) => console.log(error));
  //   // Organize inputs
  //   // Send inputs to backend via .fetch('/get_route')
  //   // Send response JSON to Map.js
  //   return 'sent to backend';
  // };

  const onOriginChange = (event) => {
    setOrigin(event.target.value);
  };
  const onDestinationChange = (event) => {
    setDestination(event.target.value);
  };
  const onTravelModeChange = (event) => {
    setTravelMode(event.target.value);
  };

  const onSubmitDirections = () => {
    if (origin && destination) {
      setDirectionsRequest({
        origin,
        destination,
        travelMode,
      });
    }
  };

  return (
    <div className='routeForms'>
      <input
        type='text'
        id='from'
        placeholder='origin'
        value={origin}
        onChange={onOriginChange}
      ></input>
      <input
        type='text'
        id='dest'
        placeholder='destination'
        value={destination}
        onChange={onDestinationChange}
      ></input>
      <b>Select type of Commute</b>
      <select id='mode' value={travelMode} onChange={onTravelModeChange}>
        <option value='DRIVING'>Driving</option>
        <option value='WALKING'>Walking</option>
        <option value='BICYCLING'>Bicycling</option>
        <option value='TRANSIT'>Transit</option>
      </select>
      <input
        type='button'
        value='Get Route'
        onClick={onSubmitDirections}
      ></input>
    </div>
  );
}

export default GetRoute;
