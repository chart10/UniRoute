import React, { useState } from "react";
import "./editProfile.css"
import axios from "axios";

function EditProfile({ onClose }) {
    const [editProfileForm, setEditProfileForm] = useState({
        firstName: '',
        lastName: '',
        university: '',
    });

    const [errorMessage, setErrorMessage] = useState('');

    function updateProfile(event) {
        axios({
            method: 'POST',
            url: '/edit_profile',
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
            data: {
                firstName: editProfileForm.firstName,
                lastName: editProfileForm.lastName,
                university: editProfileForm.university,
            },
        }).then((response) => {
            setErrorMessage(response);
            onClose();
        }).catch((error) => {
            if (error.response) {
                setErrorMessage('Update Failed');
                console.log(error.response);
                console.log(error.response.status);
                console.log(error.response.headers);
            }
        });

        setEditProfileForm({
            firstName: '',
            lastName: '',
            university: ''
        });

        event.preventDefault();
    }

    function handleChange(event) {
        const { value, name } = event.target;
        setEditProfileForm((prevNote) => ({
            ...prevNote,
            [name]: value,
        }));
    }

    return (
        <div className="profile-edit-overlay">
            <div className="profile-edit-box">
                <span className="close-button" onClick={onClose}> &times;</span> 
                <p>Please Enter Your First Name, Last Name, and University</p>
                <form class="edit-profile-form">
                    <label for="first-name-input">First Name</label>
                    <input
                        onChange={handleChange}
                        name='firstName'
                        placeholder="John"
                        value={editProfileForm.firstName}
                    />
                    <label for='last-name-input'>Last Name</label>
                    <input 
                        onChange={handleChange}
                        name='lastName'
                        placeholder="Doe"
                        value={editProfileForm.lastName}
                    />
                    <label for='university-input'>University</label>
                    <input 
                        onChange={handleChange}
                        name='university'
                        placeholder="Harvard University"
                        value={editProfileForm.university}
                    />
                    <button onClick={updateProfile}>Submit</button>
                </form>
                {errorMessage && <p className="error"> {errorMessage} </p>}
            </div>
        </div>
    );
}

export default EditProfile;
