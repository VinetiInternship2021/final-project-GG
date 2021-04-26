import React from 'react';
import { useHistory } from 'react-router-dom';

const ClientPage = () => {
    const history = useHistory();

    const onSelect = (event) => {
        event.preventDefault();
        let path = ''
        switch (event.target.innerText) {
            case 'New order':
                path = '/client/order'
                break;
            case 'My history':
                path = '/client/history'
                break;
            case 'Settings':
                path = '/client/settings'
                break;
            case 'Profile':
                path = '/client/profile'
                break;
            default:
                path = ''
        }
        history.push(path)
    }
    return (
        <div id='select' className="card" style={{ width: "18rem", height: "10.3rem" }}>
            <ul className="list-group list-group-flush">
                <li onClick={(e) => { onSelect(e) }} className="list-group-item">New order</li>
                <li onClick={(e) => { onSelect(e) }} className="list-group-item">My history</li>
                <li onClick={(e) => { onSelect(e) }} className="list-group-item">Settings</li>
                <li onClick={(e) => { onSelect(e) }} className="list-group-item">Profile</li>
            </ul>
        </div>
    )
}

export default ClientPage;
