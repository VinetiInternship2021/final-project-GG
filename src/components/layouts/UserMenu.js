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

  const buttons = menuButtons.map((button) => (
    <PageButton
      key={button[0]}
      button={button[0]}
      onSelect={onSelect}
      buttonClassName="column"
      className={button[1]}
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
  menuButtons: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default UserMenu;
