import React, { useState } from 'react'
import axios from 'axios';

// We need to fetch db data in flask
// and show on screen
function Profile(props) {
    const [profileData, setProfileData] = useState(null)
    function getData() {
        axios({
            method: "GET",
            url:"/profile",
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }).then((response) => {
            const res = response.data
            setProfileData(({
                firstName: res.firstName,
                lastName: res.lastName,
                university: res.university}))
            /*
            if (res.localStorage.getItem('token') === undefined) {
                
            } else {
                res.localStorage.getItem('token') && localStorage.setItem('token', res.localStorage.getItem('token'))
            }
            */ 
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