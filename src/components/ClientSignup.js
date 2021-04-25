import React, { useState } from 'react';
import axios from 'axios';

export default () => {
    const [phone, setPhone] = useState(null)
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
            axios.post('/signup/client', {
                phone: phone,
                name: name,
                password: password
                //իհարկե չեմ հասցրել password encription ի պահը մտածեմ/ավելացնեմ
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
            <form id='CR'>
                <div className="mb-3">
                    <br />
                    <h5>Client registration</h5>
                    <label htmlFor="phone" className="form-label">Phone</label>
                    <input onChange={(e) => { setPhone(e.target.value) }} type="number" id="phone" className="form-control" value={phone} />
                    <label htmlFor="name" className="form-label">Username</label>
                    <input onChange={(e) => { setName(e.target.value) }} type="text" id="name" className="form-control" value={name} />
                    <label htmlFor="password" className="form-label">Password</label>
                    <input onChange={(e) => { setPassword(e.target.value); setPassAlert('') }} type="password" id="password" className="form-control" value={password} />
                    <label htmlFor="password2" className="form-label">Confirm Password</label>
                    <input onChange={(e) => { setCPassword(e.target.value); setPassAlert('') }} type="password" id="password2" className="form-control" value={cPassword} />
                    <p>{passalert}</p>
                </div>
                <button onClick={(e) => { onClick(e) }} type="submit" className="btn btn-primary">Submit</button>
            </form>
        </>
    )
}
