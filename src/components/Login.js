import React from 'react';
import { useHistory } from 'react-router-dom';
import { buttons, appRoutes } from '../utils/configs';

const Login = () => {
    let history = useHistory();
    const onLogin = (button) => {
        let path = ''
        switch (button) {
            case 'Client':
                path = appRoutes.loginClient
                break;
            case 'Driver':
                path = appRoutes.loginDriver
                break;
            default:
                path = ''
        }
        history.push(path)
    }

    const button = buttons.map((button) => {
        return (
            <div key={button} >
                <button onClick={() => onLogin(button)
                }
                        className="btn btn-outline-success mb-1 w-50"
                        type="submit">{button}</button>
                <br />
            </div >
        )
    })

    return (
        <div className="text-center border position-absolute top-50 start-50 translate-middle" style={{ width: "200px", height: "180px" }}>
            <h5 className="mt-2">Login</h5>
            <p>Select user type</p>
            {button}
        </div>
    )
}

export default Login