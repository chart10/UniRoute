import React, { useState } from 'react'
import axios from 'axios';
import useToken from '../UseToken';

// We need to fetch db data in flask
// and show on screen
function Profile() {
    const [profileData, setProfileData] = useState(null)
    const [addressData, setAddressData] = useState(null)
    const { token, removetoken, setToken } = useToken();
    // function that is called to grab data from server
    function getData() {
        // axios is used to send the https request
        axios({
            method: "GET",
            url:"/profile",
            headers: {
                // checks if user is authorized to get data
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }).then((response) => {
            // get the response data (user data) ad sets its
            const res = response.data
            // checks if the session needs to be refreshed
            res.access_token && setToken(res.access_token)
            setProfileData(({
                firstName: res.firstName,
                lastName: res.lastName,
                university: res.university}))
        }).catch((error) => {
            if (error.response) {
                console.log(error.response)
                console.log(error.response.status)
                console.log(error.response.headers)
            }
        })
    }

    function saveAddress(){

    }

    function getAddress() {
        axios({
            method: "GET",
            url: "/get_address",
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }).then((response) => {
            const res = response.data
            setAddressData(res)
        }).catch((error) => {
            if (error.response) {
                console.log(error.response)
                console.log(error.response.status)
                console.log(error.response.headers)
            }
        })
    }

    return (
        <div className="Profile">
            <p>To get your profile detials: </p><button onClick={getData}>Click Me</button>
            {profileData && <div>
                    <p>First Name: {profileData.firstName}</p>
                    <p>Last Name: {profileData.lastName}</p>
                    <p>University: {profileData.university}</p>
                </div>
            }
        </div>
    );
}

export default Profile;