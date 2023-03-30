import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import axios from 'axios';
import './pages.css';

const ScheduleList = () => {
  const [scheduledDirections, setScheduledDirecitons] = useState([]);
  const [errorMessageSchedule, setErrorMessageSchedule] = useState('');

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
        setScheduledDirecitons(response.data.schedule_result);
        setErrorMessageSchedule('SCHEDULE RETRIEVED!!');
      })
      .catch((error) => {
        if (error.response) {
          setErrorMessageSchedule('FAILED TO RETRIEVE SCHEDULE! TRY AGAIN.');
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
        <div>
          <h2>SCHEDULE LIST GOES HERE</h2>
          <h3>Monday</h3>
          <ul>
            {scheduledDirections.map((route, index) => (
              <li key={'route_' + index}>{route}</li>
            ))}
          </ul>
          <h3>Tuesday</h3>
          <h3>Wednesday</h3>
          <h3>Thursday</h3>
          <h3>Friday</h3>
          <h3>Saturday</h3>
          <h3>Sunday</h3>
        </div>
      )}
    </>
  );
};
export default ScheduleList;
