import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const ClientLogin = () => {
    const history = useHistory();
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const [passalert, setPassAlert] = useState('')

    const onClick = (event) => {
        event.preventDefault();
        if (password.length < 6) {
            setPassAlert('password length should be at least 6 characters, try again!')
            setPassword('')
        } else {
            axios.post('/login/client', {
                phone: phone,
                password: password
            })
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
            history.push('/client')
        }

    }

    return (
        <>
            <form className="w-25 border position-absolute top-50 start-50 translate-middle">
                <div className="me-3 mx-3">
                    <br />
                    <h5>Client Login</h5>
                    <label htmlFor="phone" className="form-label">Phone</label>
                    <input onClick={(e) => { setPassAlert('') }} onChange={(e) => { setPhone(e.target.value) }} id="phone" type="number" className="form-control" value={phone} />
                    <label htmlFor="password" className="form-label">Password</label>
                    <input onClick={(e) => { setPassAlert('') }} onChange={(e) => { setPassword(e.target.value) }} id="password" type="password" className="form-control" value={password} />
                    <p>{passalert}</p>
                </div>
                <button onClick={(e) => { onClick(e) }} type="submit" className="btn btn-outline-success mx-3 mb-3">Submit</button>
            </form>
        </>
    )
}

export default ClientLogin;
