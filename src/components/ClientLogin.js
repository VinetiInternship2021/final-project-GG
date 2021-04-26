import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const ClientLogin = () => {
    const history = useHistory();
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')

    const onClick = (event) => {
        event.preventDefault();
        // axios.post('/login/client', {
        //     phone: phone,
        //     password: password
        // })
        //     .then(function (response) {
        //         //if ok
        //         eventGenerator('/client')
        //     })
        //     .catch(function (error) {
        //         console.log(error);
        //     });
        setPhone('');
        setPassword('')
        history.push('/client')
    }

    return (
        <>
            <form className="mt-2 ms-5 w-25">
                <div className="mb-3">
                    <br />
                    <h5>Client Login</h5>
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

export default ClientLogin;
