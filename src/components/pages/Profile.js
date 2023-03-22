import React, { useState, useEffect } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import axios from 'axios';
import useToken from '../UseToken';
import AddressList from './AddressList';
import './pages.css';
import Schedule from './Schedule';

// We need to fetch db data in flask
// and show on screen
function Profile() {
  const [profileData, setProfileData] = useState(null);
  const { addressData, setAddressData } = useOutletContext()[0];

  const { setToken } = useToken();
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

  return (
    <div className='Profile'>
      {profileData ? (
        <>
          <h2>Welcome back, {profileData.firstName}</h2>
          <p>First Name: {profileData.firstName}</p>
          <p>Last Name: {profileData.lastName}</p>
          <p>University: {profileData.university}</p>
          <AddressList addressData={addressData} />
          <Schedule />
        </>
      ) : (
        <>
          <p>It looks like you aren't signed in right now.</p>
          <Link to='../login'>
            <button>Login</button>
          </Link>
          <Link to='../register'>
            <button>Register</button>
          </Link>
        </>
      )}
    </div>
  );
}

export default Profile;
