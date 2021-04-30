import React, { useState } from 'react';
// import axios from 'axios';

const DriverLogin = () => {
    const [fields, setFields] = useState({
        phone: '',
        password: '',
        alert: ''
    })

    const onClick = (event) => {
        event.preventDefault();
        if (fields.password.length < 6) {
            setFields({ ...fields, alert: 'password length should be at least 6 characters, try again!', password: '' })
        } else if (!fields.phone) {
            setFields({ ...fields, alert: 'phone is required!' })
        } else {
            // axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
            // axios.defaults.headers.post['Accept'] = '*/*'
            // // config 
            // axios.post('http://localhost:3000/api/v1/login', {
            //     session: {
            //         phone_number: fields.phone,
            //         password: fields.password,
            //         model_name: 'Driver',
            //         remember_me: remember ? '1': '0'
            //     }
            // }, {withCredentials: true})
            //     .then(function (response) {
            //         console.log(response);
            //     })
            //     .catch(function (error) {
            //         console.log(error);
            //     });
        }
    }

    return (
        <>
            <form className="w-25 border position-absolute top-50 start-50 translate-middle">
                <div className="me-3 mx-3">
                    <br />
                    <h5>Driver Login</h5>
                    <label htmlFor="phone" className="form-label">Phone</label>
                    <input onClick={() => { setFields({ ...fields, alert: '' }) }} onChange={(e) => { setFields({ ...fields, phone: e.target.value }) }} id="phone" type="number" className="form-control" value={fields.phone} />
                    <label htmlFor="password" className="form-label">Password</label>
                    <input onClick={() => { setFields({ ...fields, alert: '' }) }} onChange={(e) => { setFields({ ...fields, password: e.target.value }) }} id="password" type="password" className="form-control" value={fields.password} />
                    <p>{fields.alert}</p>
                </div>
                <button onClick={(e) => { onClick(e) }} type="submit" className="btn btn-outline-success mx-3 mb-3">Submit</button>
            </form>
        </>
    )
}

export default DriverLogin;
