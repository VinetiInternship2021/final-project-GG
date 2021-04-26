import React from 'react';
import eventGenerator from '../utiles/eventGenerator'

export default ({ buttons }) => {

    const onSelect = (event, button) => {
        event.preventDefault();
        if (event.metaKey || event.ctrlKey) {
            return;
        }
        let path = ''
        switch (button) {
            case 'Login':
                path = '/login'
                break;
            case 'Sign up':
                path = '/signup'
                break;
            case 'Logout':
                path = '/logout'
        }
        eventGenerator(path)
    }

    const button = buttons.map((button) => {
        return <button onClick={(event) => onSelect(event, button)} className="btn btn-outline-success me-1" type="submit">{button}</button>
    })

    return (
        <nav className="navbar navbar-light bg-light">
            <div className="container-fluid">
                <a className="navbar-brand">GG Clone App</a>
                <form className="d-flex">
                    {button}
                </form>
            </div>
        </nav>
    )
}

