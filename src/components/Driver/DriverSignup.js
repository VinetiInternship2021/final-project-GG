import React, { useState } from 'react';
import axios from 'axios';

const DriverSignup = () => {
    const [fields, setFields] = useState({
        phone: '',
        password: '',
        cPassword: '',
        name: '',
        alert: ''
    })

    const onClick = (event) => {
        event.preventDefault();
        if (fields.password !== fields.cPassword) {
            setFields({ ...fields, alert: 'incorrect password, try again!', password: '', cPassword: '' })
        } else if (fields.password.length < 6) {
            setFields({ ...fields, alert: 'password length should be at least 6 characters, try again!', password: '', cPassword: '' })
        } else if (!fields.name) {
            setFields({ ...fields, alert: 'username is required!' })
        } else if (!fields.phone) {
            setFields({ ...fields, alert: 'phone is required!' })
        } else {
            axios.post('/signup/driver', {
                phone: fields.phone,
                name: fields.name,
                password: fields.password
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
                    <input onClick={() => { setFields({ ...fields, alert: '' }) }} onChange={(e) => { setFields({ ...fields, phone: e.target.value }) }} id="phone" type="number" className="form-control" value={fields.phone} />
                    <label htmlFor="name" className="form-label">Username</label>
                    <input onClick={() => { setFields({ ...fields, alert: '' }) }} onChange={(e) => { setFields({ ...fields, name: e.target.value }) }} id="name" type="text" className="form-control" value={fields.name} />
                    <label htmlFor="password" className="form-label">Password</label>
                    <input onClick={() => { setFields({ ...fields, alert: '' }) }} onChange={(e) => { setFields({ ...fields, password: e.target.value, alert: '' }) }} id="password" type="password" className="form-control" value={fields.password} />
                    <label htmlFor="cPassword" className="form-label">Confirm Password</label>
                    <input onClick={() => { setFields({ ...fields, alert: '' }) }} onChange={(e) => { setFields({ ...fields, cPassword: e.target.value, alert: '' }) }} htmlFor="cPassword" type="password" className="form-control" value={fields.cPassword} />
                    <p>{fields.alert}</p>
                </div>
                <button onClick={(e) => { onClick(e) }} type="submit" className="btn btn-outline-success mx-3 mb-3">Submit</button>
            </form>
        </>
    )
}

export default DriverSignup;