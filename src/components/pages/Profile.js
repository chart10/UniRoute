import React, { useEffect, useState } from 'react'


// We need to fetch db data in flask
// and show on screen
function Profile() {
    const [profileData, setProfileData] = useState({
        firstName: "",
        lastName: "",
        university: ""
    });

    useEffect(() =>  {
        fetch("/profile").then((res) =>
            res.json().then((data) => {
                setProfileData({
                    firstName: data.firstName,
                    lastName: data.lastName,
                    university: data.university
                });
            })
        );
    }, []);


    return (
        <div className="user-info-container">
            <header className='user-info-header'>
                <h1>Hello! Here is you info!</h1>
                <p>{profileData.firstName}</p>
                <p>{profileData.lastName}</p>
                <p>{profileData.university}</p>
            </header>
        </div>
    );
}

export default Profile;