import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { AdminPageButtons } from '../../utils/configs';
import { PageButton } from '../Buttons';

const DriverPage = () => {
  const history = useHistory();
  const location = useLocation();
  
  const onSelect = (event) => {
    let path = '';
    switch (event.target.innerText) {
      case 'New order':
        path = '/client/order';
        break;
      case 'My history':
        path = `${location.pathname}/history`;
        break;
      case 'Settings':
        path = `${location.pathname}/settings`;
        break;
      case 'Profile':
        path = `${location.pathname}/profile`;
        break;
      default:
        path = '';
    }
    
    history.push(path);
  };
  
  const buttons = AdminPageButtons.map((button) => (
    <PageButton
      button={button[0]}
      onSelect={onSelect}
      buttonClassName="column"
      className={button[1]}
    />
  ));
  
  return (
    
    <div>
      <div className="menu">
        <ul>
          {buttons}
        </ul>
      </div>
      <div className="ui-component container-md">
        <h1>User functionality container</h1>
      </div>
    </div>
  );
};

export default DriverPage;
