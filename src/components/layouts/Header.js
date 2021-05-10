import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Switch from '../../utils/headerButtonSwitch';
import { headerButtons } from '../../utils/configs';
import { logout } from '../../utils/API';
import {
  ChangeActionLoggedIn,
  ChangeActionLoading,
  mapStateToProps,
} from '../../redux/actions';
import { HeaderButton } from '../Buttons';

const Header = ({ appState, dispatch }) => {
  const state = appState;
  const location = useLocation();
  const history = useHistory();
  const [buttons, setButtons] = useState(headerButtons.loggedOut);

  useEffect(() => {
    if (state.isLoading === false) {
      if (state.loggedIn) {
        setButtons(headerButtons.loggedIn);
      } else {
        setButtons(headerButtons.loggedOut);
      }
    }
  }, [state.loggedIn]);

  const onSelect = async (event, button) => {
    if (event.metaKey || event.ctrlKey) {
      return;
    }
    if (button === 'Logout') {
      dispatch(ChangeActionLoading({ isLoading: true }));
      await logout()
        .then(() => dispatch(ChangeActionLoggedIn({
          isLoading: false,
          loggedIn: false,
          userType: '',
          userId: '',
        })))
        .then();
    }
    history.push(Switch(button, location, state));
  };

  const button = buttons.map((item) => (
    <HeaderButton
      key={item}
      button={item}
      onSelect={onSelect}
      className="header"
    />
  ));

  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className="container-fluid">
        <p className="navbar-brand">GG Clone App</p>
        <form className="d-flex">
          {button}
        </form>
      </div>
    </nav>
  );
};

Header.propTypes = {
  appState: PropTypes.objectOf(PropTypes.any).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Header);
