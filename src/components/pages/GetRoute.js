import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import './pages.css';
import axios from 'axios';
// Component: Route Finder
// Contains the forms needed to run a route query

function GetRoute() {
  // destructuring the outlet context from index.js
  const { addressData, setAddressData, setDirectionsRequest } =
    useOutletContext()[0];
  const [origin, setOrigin] = useState('atlanta');
  const [destination, setDestination] = useState('norcross');
  const [travelMode, setTravelMode] = useState('TRANSIT');
  const [transitOptions, setTransitOptions] = useState({});

  // Autocomplete useStates and useRefs
  const [showOriginDropdown, setShowOriginDropdown] = useState(false);
  const [showDestDropdown, setShowDestDropdown] = useState(false);

  useEffect(() => {
    axios({
      method: 'GET',
      url: '/get_address',
      headers: {
        // checks if user is authorized to get data
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    })
      .then((response) => {
        setAddressData(response.data.address_list);
        console.log(response.data.address_list);
      })
      // get the response data (user data) ad sets its
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
  }, []);

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
  const onDepartureTimeChange = (event) => {
    let today = new Date();
    let departure = {};
    if (event.target.value !== '') {
      // Update current date object with user entered departureTime
      today.setHours(event.target.value.substring(0, 2));
      today.setMinutes(event.target.value.substring(3, 5));
      departure = { departureTime: today };
    } else {
      departure = { departureTime: null };
    }
    setTransitOptions({
      ...transitOptions,
      ...departure,
    });
  };
  const onArrivalTimeChange = (event) => {
    let today = new Date();
    let arrival = {};
    console.log(event.target.value);
    if (event.target.value !== '') {
      // Update current date object with user entered arrivalTime
      today.setHours(event.target.value.substring(0, 2));
      today.setMinutes(event.target.value.substring(3, 5));
      arrival = { arrivalTime: today };
    } else {
      arrival = { arrivalTime: null };
    }
    setTransitOptions({
      ...transitOptions,
      ...arrival,
    });
  };
  const onSubmitDirections = () => {
    if (origin && destination) {
      setDirectionsRequest({
        origin,
        destination,
        travelMode,
        transitOptions,
      });
    }
  };

  return (
    <div className='routeForms'>
      <h2>FIND A ROUTE</h2>
      <div className='fieldWrapper'>
        <label htmlFor='from'>Origin </label>
        <input
          type='text'
          id='from'
          placeholder='enter address'
          value={origin}
          onChange={onOriginChange}
          onFocus={() => setShowOriginDropdown(true)}
          onBlur={(e) => {
            console.log(e.relatedTarget);
            if (
              !e.relatedTarget ||
              !e.relatedTarget.classList.contains('addressDropdown')
            )
              setShowOriginDropdown(false);
          }}
        ></input>
        {showOriginDropdown && (
          <div className='addressDropdown' tabIndex={'-1'}>
            {addressData && addressData.length > 0 && (
              <>
                {addressData.map((address, index) => (
                  <div
                    key={'address_' + index}
                    className='addressItem'
                    onClick={() => {
                      setOrigin(address);
                      setShowOriginDropdown(false);
                    }}
                  >
                    {address}
                  </div>
                ))}
              </>
            )}
          </div>
        )}
      </div>
      <div className='fieldWrapper'>
        <label htmlFor='dest'>Destination </label>
        <input
          type='text'
          id='dest'
          placeholder='enter address'
          value={destination}
          onChange={onDestinationChange}
          onFocus={() => setShowDestDropdown(true)}
          onBlur={(e) => {
            console.log(e.relatedTarget);
            if (
              !e.relatedTarget ||
              !e.relatedTarget.classList.contains('addressDropdown')
            )
              setShowDestDropdown(false);
          }}
        ></input>
        {showDestDropdown && (
          <div className='addressDropdown' tabIndex={'-1'}>
            {addressData && addressData.length > 0 && (
              <>
                {addressData.map((address, index) => (
                  <div
                    key={'address_' + index}
                    className='addressItem'
                    onClick={() => {
                      setDestination(address);
                      setShowDestDropdown(false);
                    }}
                  >
                    {address}
                  </div>
                ))}
              </>
            )}
          </div>
        )}
      </div>
      {/* TODO: Create Departure/Arrival Time input fields */}
      <label htmlFor='depart'>Departure Time </label>
      <input type='time' id='depart' onChange={onDepartureTimeChange}></input>
      <label htmlFor='arrive'>Arrival Time </label>
      <input type='time' id='arrive' onChange={onArrivalTimeChange}></input>
      <b>Select type of Commute </b>
      <select id='mode' value={travelMode} onChange={onTravelModeChange}>
        <option value='DRIVING'>Driving</option>
        <option value='WALKING'>Walking</option>
        <option value='BICYCLING'>Bicycling</option>
        <option value='TRANSIT' selected>
          Transit
        </option>
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
