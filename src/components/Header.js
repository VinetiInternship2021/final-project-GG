import React from 'react';
import { useHistory } from 'react-router-dom';

const Header = ({ buttons }) => {
    let history = useHistory();

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
                path = '/'
                break;
            default:
                path = ''
        }
        history.push(path)
    }

    const button = buttons.map((button) => {
        return <button key={button} onClick={(event) => onSelect(event, button)} className="btn btn-outline-success me-1" type="submit">{button}</button>
    })

    return (
        <nav className="navbar navbar-light bg-light">
            <div className="container-fluid">
                <p className="navbar-brand">GG Clone App</p>
                <form className="d-flex">
                    {button}
                </form>
            </div>
        </nav>
    )
}

export default Header