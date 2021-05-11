import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { mapStateToProps } from '../../redux/actions';
import { AdminPageButtons, appRoutes } from '../../utils/configs';
import SettingsHelper from '../../helpers/SettingsHelper';
import UserMenu from '../layouts/UserMenu';

const AdminSettings = ({ appState }) => {
  const { userId } = appState;

  return (
    <div>
      {userId
        ? (
          <UserMenu
            routes={appRoutes.admin}
            userId={userId}
            menuButtons={AdminPageButtons}
          />
        ) : false}
      <div className="ui-component container-md">
        <div className="card text-center position-absolute top-50 start-50 translate-middle">
          <SettingsHelper modelName="super_users" reqKey="super_user" />
        </div>
      </div>
    </div>
  );
};

AdminSettings.propTypes = {
  // match: PropTypes.objectOf(PropTypes.any).isRequired,
  appState: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default connect(mapStateToProps)(AdminSettings);
