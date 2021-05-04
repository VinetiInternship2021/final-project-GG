import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { DriverPageButtons } from '../../utils/configs'

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
  
  const buttons = DriverPageButtons.map((button) => {
    return(
      <button key={button}
              onClick={(event) => onSelect(event)}
              className="btn btn-outline-success me-1"
              type="submit">{button}</button>
    )
  })
  
  return (
    <div className="card text-center position-absolute top-50 start-50 translate-middle" style={{ width: "300px", height: "466px" }}>
      <ul className="list-group list-group-flush">
        {buttons}
      </ul>
    </div>
  )
}

export default DriverPage;
