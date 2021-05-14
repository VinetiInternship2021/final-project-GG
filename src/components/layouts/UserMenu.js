import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import MenuHelper from '../../helpers/MenuHelper';
import { PageButton } from '../Buttons';

const UserMenu = ({
  routes,
  userId,
  menuButtons,
}) => {
  const history = useHistory();
  const onSelect = (event) => {
    const user = routes;
    const path = MenuHelper({ event, userId, user });
    history.push(path);
  };

  const buttons = Object.keys(menuButtons).map((buttonKey) => (
    <PageButton
      key={menuButtons[buttonKey].text}
      button={menuButtons[buttonKey].text}
      onSelect={onSelect}
      buttonClassName="column"
      className={menuButtons[buttonKey].icon}
    />
  ));

  return (
    <div className="menu">
      <ul>
        {buttons}
      </ul>
    </div>
  );
};

UserMenu.propTypes = {
  routes: PropTypes.objectOf(PropTypes.any).isRequired,
  userId: PropTypes.number.isRequired,
  menuButtons: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default UserMenu;
