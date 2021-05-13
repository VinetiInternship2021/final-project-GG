import { useHistory, useLocation } from 'react-router-dom';
import React from 'react';
import { appRoutes, clientPageItems } from './configs';
import { PageButton } from '../components/Buttons';

export const ClientMenu = () => {
  const history = useHistory();
  const location = useLocation();

  const handleMenu = (event) => {
    let path = '';
    switch (event.currentTarget.getAttribute('data-name')) {
      case 'New order':
        path = `${location.pathname}/${appRoutes.client.client}`;
        break;
      case 'My history':
        path = `${location.pathname}/${appRoutes.client.history}`;
        break;
      case 'Settings':
        path = `${location.pathname}/${appRoutes.client.settings}`;
        break;
      default:
        path = '#';
    }
    history.push(path);
  };
  return clientPageItems.map((item) => (
    <PageButton
      key={item}
      button={item[0]}
      onSelect={handleMenu}
      buttonClassName="column"
      className={item[1]}
    />
  ));
};

export default ClientMenu;
