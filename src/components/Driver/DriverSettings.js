import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { mapStateToProps } from '../../redux/actions';
import SettingsHelper from '../../helpers/SettingsHelper';
import { appRoutes, DriverPageButtons } from '../../utils/configs';
import UserMenu from '../layouts/UserMenu';

const DriverSettings = ({ match: { params: { id } } }) => {
  const userId = id;

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
        <div className="card text-center top-50 start-50 translate-middle">
          <SettingsHelper modelName="drivers" reqKey="driver" driver />
        </div>
      </div>
    </div>
  );
};

DriverSettings.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
  // appState: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default connect(mapStateToProps)(DriverSettings);
