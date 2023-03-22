import React from 'react';

const Schedule = () => {
  return (
    <section id='scheduleSection'>
      <h2>Weekly Schedule</h2>
      <ul id='weeklySchedule'></ul>
      <p>Add a route to your weekly schedule:</p>
      <input type='checkbox' id='Monday' name='Monday' value='Monday'></input>
      <label htmlFor='Monday'>Monday</label>
      <input
        type='checkbox'
        id='Tuesday'
        name='Tuesday'
        value='Tuesday'
      ></input>
      <label htmlFor='Tuesday'>Tuesday</label>
      <input
        type='checkbox'
        id='Wednesday'
        name='Wednesday'
        value='Wednesday'
      ></input>
      <label htmlFor='Wednesday'>Wednesday</label>
      <input
        type='checkbox'
        id='Thursday'
        name='Thursday'
        value='Thursday'
      ></input>
      <label htmlFor='Thursday'>Thursday</label>
      <input type='checkbox' id='Friday' name='Friday' value='Friday'></input>
      <label htmlFor='Friday'>Friday</label>
      <input
        type='checkbox'
        id='Saturday'
        name='Saturday'
        value='Saturday'
      ></input>
      <label htmlFor='Saturday'>Saturday</label>
      <input type='checkbox' id='Sunday' name='Sunday' value='Sunday'></input>
      <label htmlFor='Sunday'>Sunday</label>
      <br />
      <label htmlFor='scheduleOrigin'>Origin </label>
      <input type='text' id='scheduleOrigin'></input>
      <label htmlFor='scheduleDest'>Destination </label>
      <input type='text' id='scheduleDest'></input>
      <br />
      <label htmlFor='scheduleDepart'>Departure Time </label>
      <input type='time' id='scheduleDepart'></input>
      <label htmlFor='scheduleArrive'>Arrival Time </label>
      <input type='time' id='scheduleArrive'></input>
    </section>
  );
};
export default Schedule;
