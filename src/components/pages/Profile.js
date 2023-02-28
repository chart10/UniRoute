import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import axios from 'axios';
import useToken from '../UseToken';

// We need to fetch db data in flask
// and show on screen
function Profile() {
  const [profileData, setProfileData] = useState(null);
  const [addressData, setAddressData] = useOutletContext();
  const { token, removetoken, setToken } = useToken();
  // function that is called to grab data from server

  useEffect(() => {
    // axios is used to send the https request
    axios({
      method: 'GET',
      url: '/profile',
      headers: {
        // checks if user is authorized to get data
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    })
      .then((response) => {
        // get the response data (user data) ad sets its
        const res = response.data;
        // checks if the session needs to be refreshed
        res.access_token && setToken(res.access_token);
        setProfileData({
          firstName: res.firstName,
          lastName: res.lastName,
          university: res.university,
        });
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
    <div className='Profile'>
      {/* <p>To get your profile detals: </p>
      <button onClick={getData}>Click Me</button> */}
      {profileData && (
        <>
          <p>First Name: {profileData.firstName}</p>
          <p>Last Name: {profileData.lastName}</p>
          <p>University: {profileData.university}</p>
        </>
      )}
    </div>
  );
}

export default Profile;
