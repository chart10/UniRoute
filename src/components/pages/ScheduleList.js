import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import axios from 'axios';
import './pages.css';

const ScheduleList = () => {
  // scheduleDirections is an array of objects that represent saved routes
  // route = { 'routeID': int, 'dayOfWeek': int, 'travelMode': string, 'departArrive': string,
  // 'timeOfDay': hh:mm, 'origin': string, 'destination': string}
  const [scheduledDirections, setScheduledDirecitons] = useState([]);

  // UseEffect that pulls user's scheduled directions from the database
  useEffect(() => {
    axios({
      method: 'GET',
      url: '/get_schedule',
      headers: {
        // checks if user is authorized to get data
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    })
      .then((response) => {
        console.log(response);
        setScheduledDirecitons(response.data);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
  }, []);

  const removeScheduledDirections = (route) => {
    axios({
      method: 'POST',
      url: '/remove_scheduled_directions',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
      data: {
        routeID: route.routeID,
      },
    }).catch((error) => {
      if (error.response) {
        console.log(error.response);
        console.log(error.response.status);
        console.log(error.response.headers);
      }
    });
    const updatedSchedule = scheduledDirections.filter(
      (item) => item !== route
    );
    setScheduledDirecitons(updatedSchedule);
  };

  return (
    <>
      {scheduledDirections === null ? (
        <p>You\'re weekly scheduled routes will appear here.</p>
      ) : (
        <div className='weeklySchedule'>
          <ul className='weekday'>
            <h3>Monday</h3>
            {scheduledDirections.map((route, index) =>
              route.dayOfWeek === 0 ? (
                <li className='route' key={'route_' + index}>
                  <p>Origin: {route.origin}</p>
                  <p>Destination: {route.destination}</p>
                  <p>
                    {route.departArrive} @ {route.timeOfDay}
                  </p>
                  <button onClick={() => removeScheduledDirections(route)}>
                    Remove
                  </button>
                  <br />
                </li>
              ) : null
            )}
          </ul>
          <ul className='weekday'>
            <h3>Tuesday</h3>
            {scheduledDirections.map((route, index) =>
              route.dayOfWeek === 1 ? (
                <li className='route' key={'route_' + index}>
                  <p>Origin: {route.origin}</p>
                  <p>Destination: {route.destination}</p>
                  <p>
                    {route.departArrive} @ {route.timeOfDay}
                  </p>
                  <button onClick={() => removeScheduledDirections(route)}>
                    Remove
                  </button>
                  <br />
                </li>
              ) : null
            )}
          </ul>
          <ul className='weekday'>
            <h3>Wednesday</h3>
            {scheduledDirections.map((route, index) =>
              route.dayOfWeek === 2 ? (
                <li className='route' key={'route_' + index}>
                  <p>Origin: {route.origin}</p>
                  <p>Destination: {route.destination}</p>
                  <p>
                    {route.departArrive} @ {route.timeOfDay}
                  </p>
                  <button onClick={() => removeScheduledDirections(route)}>
                    Remove
                  </button>
                  <br />
                </li>
              ) : null
            )}
          </ul>
          <ul className='weekday'>
            <h3>Thursday</h3>
            {scheduledDirections.map((route, index) =>
              route.dayOfWeek === 3 ? (
                <li className='route' key={'route_' + index}>
                  <p>Origin: {route.origin}</p>
                  <p>Destination: {route.destination}</p>
                  <p>
                    {route.departArrive} @ {route.timeOfDay}
                  </p>
                  <button onClick={() => removeScheduledDirections(route)}>
                    Remove
                  </button>
                  <br />
                </li>
              ) : null
            )}
          </ul>
          <ul className='weekday'>
            <h3>Friday</h3>
            {scheduledDirections.map((route, index) =>
              route.dayOfWeek === 4 ? (
                <li className='route' key={'route_' + index}>
                  <p>Origin: {route.origin}</p>
                  <p>Destination: {route.destination}</p>
                  <p>
                    {route.departArrive} @ {route.timeOfDay}
                  </p>
                  <button onClick={() => removeScheduledDirections(route)}>
                    Remove
                  </button>
                  <br />
                </li>
              ) : null
            )}
          </ul>
          <ul className='weekday'>
            <h3>Saturday</h3>
            {scheduledDirections.map((route, index) =>
              route.dayOfWeek === 5 ? (
                <li className='route' key={'route_' + index}>
                  <p>Origin: {route.origin}</p>
                  <p>Destination: {route.destination}</p>
                  <p>
                    {route.departArrive} @ {route.timeOfDay}
                  </p>
                  <button onClick={() => removeScheduledDirections(route)}>
                    Remove
                  </button>
                  <br />
                </li>
              ) : null
            )}
          </ul>
          <ul className='weekday'>
            <h3>Sunday</h3>
            {scheduledDirections.map((route, index) =>
              route.dayOfWeek === 6 ? (
                <li className='route' key={'route_' + index}>
                  <p>Origin: {route.origin}</p>
                  <p>Destination: {route.destination}</p>
                  <p>
                    {route.departArrive} @ {route.timeOfDay}
                  </p>
                  <button onClick={() => removeScheduledDirections(route)}>
                    Remove
                  </button>
                  <br />
                </li>
              ) : null
            )}
          </ul>
        </div>
      )}
    </>
  );
};
export default ScheduleList;
