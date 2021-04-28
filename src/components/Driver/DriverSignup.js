import React, { useState } from 'react';
import axios from 'axios';

const DriverSignup = () => {
    const [phone, setPhone] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [cPassword, setCPassword] = useState('')
    const [passalert, setPassAlert] = useState('')

    const onClick = (event) => {
        event.preventDefault();
        if (password !== cPassword) {
            setPassAlert('incorrect password, try again!')
            setCPassword('')
            setPassword('')
        } else if (password.length < 6) {
            setPassAlert('password length should be at least 6 characters, try again!')
            setCPassword('')
            setPassword('')
        } else if (!name) {
            setPassAlert('username is required!')
        } else if (!phone) {
            setPassAlert('phone is required!')
        } else {
            axios.post('/signup/driver', {
                phone: phone,
                name: name,
                password: password
            })
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }

    return (
        <>
            <form className="w-25 border position-absolute top-50 start-50 translate-middle">
                <div className="me-3 mx-3">
                    <br />
                    <h5>Driver registration</h5>
                    <label htmlFor="phone" className="form-label">Phone</label>
                    <input onClick={() => { setPassAlert('') }} onChange={(e) => { setPhone(e.target.value) }} id="phone" type="number" className="form-control" value={phone} />
                    <label htmlFor="name" className="form-label">Username</label>
                    <input onClick={() => { setPassAlert('') }} onChange={(e) => { setName(e.target.value) }} id="name" type="text" className="form-control" value={name} />
                    <label htmlFor="password" className="form-label">Password</label>
                    <input onClick={() => { setPassAlert('') }} onChange={(e) => { setPassword(e.target.value); setPassAlert('') }} id="password" type="password" className="form-control" value={password} />
                    <label htmlFor="cPassword" className="form-label">Confirm Password</label>
                    <input onClick={() => { setPassAlert('') }} onChange={(e) => { setCPassword(e.target.value); setPassAlert('') }} htmlFor="cPassword" type="password" className="form-control" value={cPassword} />
                    <p>{passalert}</p>
                </div>
                <button onClick={(e) => { onClick(e) }} type="submit" className="btn btn-outline-success mx-3 mb-3">Submit</button>
            </form>
        </>
    )
}

export default DriverSignup;