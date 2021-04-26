import React, { useState } from 'react';
import axios from 'axios';

export default () => {
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
            <form className="mt-2 ms-5 w-25">
                <div className="mb-3">
                    <br />
                    <h5>Driver registration</h5>
                    <label htmlFor="phone" className="form-label">Phone</label>
                    <input onChange={(e) => { setPhone(e.target.value) }} type="number" className="form-control" value={phone} />
                    <label htmlFor="name" className="form-label">Username</label>
                    <input onChange={(e) => { setName(e.target.value) }} type="text" className="form-control" value={name} />
                    <label htmlFor="password" className="form-label">Password</label>
                    <input onChange={(e) => { setPassword(e.target.value); setPassAlert('') }} type="password" className="form-control" value={password} />
                    <label htmlFor="password2" className="form-label">Confirm Password</label>
                    <input onChange={(e) => { setCPassword(e.target.value); setPassAlert('') }} type="password" className="form-control" value={cPassword} />
                    <p>{passalert}</p>
                </div>
                <button onClick={(e) => { onClick(e) }} type="submit" className="btn btn-primary">Submit</button>
            </form>
        </>
    )
}
