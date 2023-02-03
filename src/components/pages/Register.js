import React, { useState } from "react";

export const Register = (props) => {
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [university, setUniversity] = useState('')
    const [email, setEmail] = useState('');
    const [password, setPass] = useState('');
    

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email);
        fetch('/time').then()
    }

    return (
        <div className="auth-form-container">
            <h2>Register</h2>
        <form className="register-form" onSubmit={handleSubmit}>
            <label htmlFor="name">First Name</label>
            <input value={name} name="name" onChange={(e) => setName(e.target.value)} id="name" placeholder="First Name" />

            <label htmlFor="lastName">Last Name</label>
            <input value={lastName} name="lastName" onChange={(e) => setLastName(e.target.value)} id="lastName" placeholder="Last Name"/>

            <label htmlFor="university">University</label>
            <input value={university} name="university" onChange={(e) => setUniversity(e.target.value)} id="university" placeholder="University" />


            <label htmlFor="email">email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)}type="email" placeholder="youremail@gmail.com" id="email" name="email" />
            <label htmlFor="password">password</label>
            <input value={password} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" />
            <button type="submit">Submit Registration</button>
        </form>
        <button className="link-btn" onClick={() => props.onFormSwitch('login')}>Already have an account? Login here.</button>
    </div>
    )
}