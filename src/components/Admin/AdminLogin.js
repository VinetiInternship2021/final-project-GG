import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { appRoutes } from '../../utils/configs'

const AdminLogin = () => {
    const history = useHistory();
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
            axios.post('/login/admin', {
                phone: fields.phone,
                password: fields.password
            })
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
            history.push(appRoutes.admin)
        }
    }

    return (
        <>
            <form className="w-25 border position-absolute top-50 start-50 translate-middle">
                <div className="me-3 mx-3">
                    <br />
                    <h5>Admin Login</h5>
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

export default AdminLogin;
