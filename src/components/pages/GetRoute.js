import React, { useState, useRef, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import './pages.css'
// Component: Route Finder
// Contains the forms needed to run a route query

function GetRoute(props) {
  // destructuring the outlet context from index.js
  const { addressData, directionsRequest, setDirectionsRequest } = useOutletContext()[0];
  const [origin, setOrigin] = useState('atlanta');
  const [destination, setDestination] = useState('norcross');
  const [travelMode, setTravelMode] = useState('TRANSIT');

  // Autocomplete useStates and useRefs
  const [ showOriginDropdown, setShowOriginDropdown ] = useState(false);
  const [ showDestDropdown, setShowDestDropdown ] = useState(false);

  // This is the backend API call for Google Maps
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

  // Functions to control input of route information into directionsRequest
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
      <h2>FIND A ROUTE</h2>
      <div className='fieldWrapper'>
        <input
          type='text'
          id='from'
          placeholder='origin'
          value={origin}
          onChange={onOriginChange}
          onFocus={() => setShowOriginDropdown(true)}
          //onBlur={() => {setTimeout(() => setShowOriginDropdown(false), 100);}}
        ></input>
        {showOriginDropdown && (
          <div className="addressDropdown">
            {addressData && addressData.length > 0 && (
              <>
                {addressData.map((address, index) => (
                  <div
                    key={"address_" + index}
                    className="addressItem"
                    onClick={() => {
                      setOrigin(address)
                      setShowOriginDropdown(false)
                      }}
                  >{address}</div>
                ))}
              </>
            )}
          </div>
        )}
      </div>
      <div className='fieldWrapper'>
        <input
          type='text'
          id='dest'
          placeholder='origin'
          value={destination}
          onChange={onDestinationChange}
          onFocus={() => setShowDestDropdown(true)}
          //onBlur={() => {setTimeout(() => setShowDestDropdown(false), 100);}}
        ></input>
        {showDestDropdown && (
          <div className="addressDropdown">
            {addressData && addressData.length > 0 && (
              <>
                {addressData.map((address, index) => (
                  <div
                    key={"address_" + index}
                    className="addressItem"
                    onClick={() => {
                      setDestination(address)
                      setShowDestDropdown(false)
                    }}
                  >{address}</div>
                ))}
              </>
            )}
          </div>
        )}
      </div>
      {/* <input
        type='text'
        id='dest'
        placeholder='destination'
        value={destination}
        onChange={onDestinationChange}
      ></input> */}
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
