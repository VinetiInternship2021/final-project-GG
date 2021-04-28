import React from 'react';
import { useHistory } from 'react-router-dom';

const ClientPage = () => {
    const history = useHistory();

    const onSelect = (event) => {
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
        <div className="card text-center position-absolute top-50 start-50 translate-middle" style={{ width: "300px", height: "166px" }}>
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
