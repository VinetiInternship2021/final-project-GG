import React from 'react';
import { useHistory } from 'react-router-dom';

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

    const button = ['Client', 'Driver'].map((button) => {
        return (
            <>
                <button key={button} onClick={(event) => onLogin(event, button)} className="btn btn-outline-success mb-1" type="submit">{button}</button>
                <br />
            </>
        )
    })

    return (
        <div id='select'>
            <h5 id='h'>Login</h5>
            <p>Select user type</p>
            {button}
        </div>
    )
}

export default Login;