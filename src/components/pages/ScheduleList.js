import React, { useState, useEffect } from 'react';
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

  return (
    <>
      {scheduledDirections === null ? (
        <p>You\'re weekly scheduled routes will appear here.</p>
      ) : (
        <div className='weeklySchedule'>
          <h3 className='weekday'>Monday</h3>
          <ul>
            {scheduledDirections.map((route, index) =>
              route[1] === 0 ? (
                <li className='route' key={'route_' + index}>
                  <p>Origin: {route[5]}</p>
                  <p>Destination: {route[6]}</p>
                  <p>
                    {route[3]} @ {route[4].slice(0, route[4].length - 3)}
                  </p>
                  <br />
                </li>
              ) : null
            )}
          </ul>
          <h3 className='weekday'>Tuesday</h3>
          <ul>
            {scheduledDirections.map((route, index) =>
              route[1] === 1 ? (
                <li className='route' key={'route_' + index}>
                  <p>Origin: {route[5]}</p>
                  <p>Destination: {route[6]}</p>
                  <p>
                    {route[3]} @ {route[4].slice(0, route[4].length - 3)}
                  </p>
                  <br />
                </li>
              ) : null
            )}
          </ul>
          <h3 className='weekday'>Wednesday</h3>
          <ul>
            {scheduledDirections.map((route, index) =>
              route[1] === 2 ? (
                <li className='route' key={'route_' + index}>
                  <p>Origin: {route[5]}</p>
                  <p>Destination: {route[6]}</p>
                  <p>
                    {route[3]} @ {route[4].slice(0, route[4].length - 3)}
                  </p>
                  <br />
                </li>
              ) : null
            )}
          </ul>
          <h3 className='weekday'>Thursday</h3>
          <ul>
            {scheduledDirections.map((route, index) =>
              route[1] === 3 ? (
                <li className='route' key={'route_' + index}>
                  <p>Origin: {route[5]}</p>
                  <p>Destination: {route[6]}</p>
                  <p>
                    {route[3]} @ {route[4].slice(0, route[4].length - 3)}
                  </p>
                  <br />
                </li>
              ) : null
            )}
          </ul>
          <h3 className='weekday'>Friday</h3>
          <ul>
            {scheduledDirections.map((route, index) =>
              route[1] === 4 ? (
                <li className='route' key={'route_' + index}>
                  <p>Origin: {route[5]}</p>
                  <p>Destination: {route[6]}</p>
                  <p>
                    {route[3]} @ {route[4].slice(0, route[4].length - 3)}
                  </p>
                  <br />
                </li>
              ) : null
            )}
          </ul>
          <h3>Saturday</h3>
          <ul>
            {scheduledDirections.map((route, index) =>
              route[1] === 5 ? (
                <li className='route' key={'route_' + index}>
                  <p>Origin: {route[5]}</p>
                  <p>Destination: {route[6]}</p>
                  <p>
                    {route[3]} @ {route[4].slice(0, route[4].length - 3)}
                  </p>
                  <br />
                </li>
              ) : null
            )}
          </ul>
          <h3>Sunday</h3>
          <ul>
            {scheduledDirections.map((route, index) =>
              route[1] === 6 ? (
                <li className='route' key={'route_' + index}>
                  <p>Origin: {route[5]}</p>
                  <p>Destination: {route[6]}</p>
                  <p>
                    {route[3]} @ {route[4].slice(0, route[4].length - 3)}
                  </p>
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
