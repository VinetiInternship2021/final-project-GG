import React from 'react';
import { useHistory } from 'react-router-dom';
import { buttons } from '../configs';

const Login = () => {
    let history = useHistory();
    const onLogin = (event, button) => {
        event.preventDefault();
        let path = ''
        switch (button) {
            case 'Client':
                path = '/login/client'
                break;
            case 'Driver':
                path = '/login/driver'
                break;
            default:
                path = ''
        }
        history.push(path)
    }

    const button = buttons.map((button) => {
        return (
            <>
                <button key={button} onClick={(event) => onLogin(event, button)} className="btn btn-outline-success mb-1 w-50" type="submit">{button}</button>
                <br />
            </>
        )
    })

    return (
        <div className="text-center border position-absolute top-50 start-50 translate-middle" style={{ width: "200px", height: "180px" }}>
            <h5 id='h' className="mt-2">Login</h5>
            <p>Select user type</p>
            {button}
        </div>
    )
}

export default Login;