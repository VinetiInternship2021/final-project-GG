import React from 'react';
import { useHistory } from 'react-router-dom';

const Signup = () => {
    let history = useHistory();
    let path = ''
    const onSignup = (event, button) => {
        event.preventDefault();
        switch (button) {
            case 'Client':
                path = '/signup/client'
                break;
            case 'Driver':
                path = '/signup/driver'
                break;
            default:
                path = ''
        }
        history.push(path)
    }

    const button = ['Client', 'Driver'].map((button) => {
        return (
            <>
                <button key={button} onClick={(event) => onSignup(event, button)} className="btn btn-outline-success mb-1" type="submit">{button}</button>
                <br />
            </>
        )
    })

    return (
        <div id='select' className="top-40 start-50">
            <h5 id='h'>Sign up</h5>
            <p>Select user type</p>
            {button}
        </div>
    )
}

export default Signup;
