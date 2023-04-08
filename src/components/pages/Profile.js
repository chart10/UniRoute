import React, { useState, useEffect } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import axios from 'axios';
import useToken from '../UseToken';
import AddressList from './AddressList';
import './pages.css';
import Schedule from './Schedule';
import EditProfile from './EditProfile';

// We need to fetch db data in flask
// and show on screen
function Profile() {
  const [profileData, setProfileData] = useState(null);
  const { addressData, setAddressData } = useOutletContext()[0];

  const { setToken } = useToken();

  const [showEditProfile, setShowEditProfile] = useState(false);

  // function that is called to grab data from server
  useEffect(() => {
    // axios is used to send the https request
    axios({
      method: 'GET',
      url: '/get_profile',
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
        //console.log(response.data.address_list);
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
  function closeProfileOverlay() {
    const profileOverlay = document.querySelector('.profile-overlay');
    profileOverlay.style.display = 'none';
  }

  const handleEditProfileClick = () => {
    setShowEditProfile(true);
  };

  const handleEditProfileClose = () => {
    setShowEditProfile(false);
  };

  return (
    <div className='profile-overlay'>
      <div className='profile-box'>
        <span className='close-button' onClick={closeProfileOverlay}>
          {' '}
          &times;
        </span>
        {profileData ? (
          <>
            <h1>
              Welcome back! {profileData.firstName} {profileData.lastName}
            </h1>
            {/** <p>University: {profileData.university}</p>*/}
            <button onClick={handleEditProfileClick}>Edit Profile</button>
            {showEditProfile && (
              <EditProfile onClose={handleEditProfileClose} />
            )}
            <AddressList addressData={addressData} />
            <Schedule />
          </>
        ) : (
          <>
            <p>It looks like you aren&apos;t signed in right now.</p>
            <Link to='../login'>
              <button>Login</button>
            </Link>
            <Link to='../register'>
              <button>Register</button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Profile;
