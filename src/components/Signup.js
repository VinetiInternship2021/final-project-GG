import React from 'react';
import eventGenerator from '../utiles/eventGenerator'

export default () => {

    const onSignup = (event, button) => {
        event.preventDefault();
        let path = ''
        switch (button) {
            case 'Client':
                path = '/signup/client'
                break;
            case 'Driver':
                path = '/signup/driver'
        }
        eventGenerator(path)
    }

    const button = ['Client', 'Driver'].map((button) => {
        return (
            <>
                <button onClick={(event) => onSignup(event, button)} className="btn btn-outline-success mb-1" type="submit">{button}</button>
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
