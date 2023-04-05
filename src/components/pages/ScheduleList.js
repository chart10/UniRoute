import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import axios from 'axios';
import './pages.css';
import ScheduledRoute from './ScheduledRoute';

const ScheduleList = () => {
  // scheduleDirections is an array of objects that represent saved routes
  // route = { 'routeID': int, 'dayOfWeek': int, 'travelMode': string, 'departArrive': string,
  // 'timeOfDay': hh:mm, 'origin': string, 'destination': string}
  const [scheduledDirections, setScheduledDirecitons] = useState([]);
  const weekday = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];

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
          {weekday.map((day, index) => (
            <ScheduledRoute
              weekday={day}
              weekdayIndex={index}
              scheduledDirections={scheduledDirections}
              setScheduledDirecitons={setScheduledDirecitons}
            />
          ))}
        </div>
      )}
    </>
  );
};
export default ScheduleList;
