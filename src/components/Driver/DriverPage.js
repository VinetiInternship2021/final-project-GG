import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { appRoutes, DriverPageButtons } from '../../utils/configs';
import { mapStateToProps } from '../../redux/actions';
import UserMenu from '../layouts/UserMenu';

const DriverPage = ({ appState }) => {
  const { userId } = appState;

  return (
    <div>
      {userId
        ? (
          <UserMenu
            routes={appRoutes.driver}
            userId={userId}
            menuButtons={DriverPageButtons}
          />
        ) : false}
      <div className="ui-component container-md">
        <h1>User functionality container</h1>
      </div>
    </div>
  );
};

DriverPage.propTypes = {
  // match: PropTypes.objectOf(PropTypes.any).isRequired,
  appState: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default connect(mapStateToProps)(DriverPage);
