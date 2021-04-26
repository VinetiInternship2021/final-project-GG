import React, { useState } from 'react';
import axios from 'axios';

const AdminLogin = () => {
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')

    const onClick = (event) => {
        event.preventDefault();
        axios.post('/login/admin', {
            phone: phone,
            password: password
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
        setPhone('');
        setPassword('')
    }

    return (
        <>
            <form className="mt-2 ms-5 w-25">
                <div className="mb-3">
                    <br />
                    <h5>Admin Login</h5>
                    <label htmlFor="phone" className="form-label">Phone</label>
                    <input onChange={(e) => { setPhone(e.target.value) }} type="number" className="form-control" value={phone} />
                    <label htmlFor="password" className="form-label">Password</label>
                    <input onChange={(e) => { setPassword(e.target.value) }} type="password" className="form-control" value={password} />
                </div>
                <button onClick={(e) => { onClick(e) }} type="submit" className="btn btn-primary">Submit</button>
            </form>
        </>
    )
}

export default AdminLogin;
