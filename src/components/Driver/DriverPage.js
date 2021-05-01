import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import Maps from '../../shared/Maps/Maps'

const DriverPage = () => {
  const history = useHistory()
  const location = useLocation()
  
  const onSelect = (event) => {
    let path = ''
    switch (event.target.innerText) {
      case 'New order':
        path = '/client/order'
        break;
      case 'My history':
        path = `${location.pathname}/history`
        break;
      case 'Settings':
        path = `${location.pathname}/settings`
        break;
      case 'Profile':
        path = `${location.pathname}/profile`
        break;
      default:
        path = ''
    }
    history.push(path)
  }
  return (
    <div className="card text-center position-absolute top-50 start-50 translate-middle" style={{ width: "300px", height: "466px" }}>
      <ul className="list-group list-group-flush">
        <li onClick={(e) => { onSelect(e) }} className="list-group-item">New order</li>
        <li onClick={(e) => { onSelect(e) }} className="list-group-item">My history</li>
        <li onClick={(e) => { onSelect(e) }} className="list-group-item">Settings</li>
        <li onClick={(e) => { onSelect(e) }} className="list-group-item">Profile</li>
      </ul>
      {/*< Maps params = {{*/}
      {/*  'mapsMode': 'view',*/}
      {/*  'center': '40.185040, 44.514813',*/}
      {/*  'zoom': '15',*/}
      {/*  'origin': '',*/}
      {/*  'destination': ''*/}
      {/*}}*/}
      {/*/>*/}
    </div>
  )
}

export default DriverPage;
