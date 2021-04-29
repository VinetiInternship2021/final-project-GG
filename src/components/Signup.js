import React from 'react';
import { useHistory } from 'react-router-dom';
import { buttons, appRoutes } from '../utils/configs';

const Signup = () => {
    let history = useHistory();
    let path = ''
    const onSignup = (button) => {
        switch (button) {
            case 'Client':
                path = appRoutes.signupClient;
                break;
            case 'Driver':
                path = appRoutes.signupDriver;
                break;
            default:
                path = ''
        }
        history.push(path)
    }

    const button = buttons.map((button) => {
        return (
            <div key={button}>
                <button onClick={() => onSignup(button)} className="btn btn-outline-success mb-1 w-50" type="submit">{button}</button>
                <br />
            </div>
        )
    })

    return (
        <div className="text-center border position-absolute top-50 start-50 translate-middle" style={{ width: "200px", height: "180px" }}>
            <h5 className="mt-2">Sign up</h5>
            <p>Select user type</p>
            {button}
        </div>
    )
}

export default Signup;
