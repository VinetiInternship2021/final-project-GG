import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Switch } from '../utils/headerButtonSwitch'

const Header = ({ buttons }) => {
    const location = useLocation();
    let history = useHistory();

    const onSelect = (event, button) => {
        if (event.metaKey || event.ctrlKey) {
            return;
        }
        history.push(Switch(button, location))
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