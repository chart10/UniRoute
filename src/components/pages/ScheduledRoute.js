import React from 'react';
import axios from 'axios';
import './pages.css';

const ScheduledRoute = (props) => {
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
    const updatedSchedule = props.scheduledDirections.filter(
      (item) => item !== route
    );
    props.setScheduledDirecitons(updatedSchedule);
  };

  return (
    <>
      <ul className='weekday'>
        <h3 className='weekday'>{props.weekday}</h3>
        {props.scheduledDirections.map((route, index) =>
          route.dayOfWeek === props.weekdayIndex ? (
            <li key={'route_' + index}>
              <div className='route'>
                <p>Origin: {route.origin}</p>
                <p>Destination: {route.destination}</p>
                <p>
                  {route.departArrive} @ {route.timeOfDay}
                </p>
              </div>
              <button onClick={() => removeScheduledDirections(route)}>
                Remove
              </button>
              <br />
            </li>
          ) : null
        )}
      </ul>
    </>
  );
};
export default ScheduledRoute;
