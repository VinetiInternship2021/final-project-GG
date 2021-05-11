import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { mapStateToProps } from '../../redux/actions';
import SettingsHelper from '../../helpers/SettingsHelper';
import { appRoutes, clientPageItems } from '../../utils/configs';
import UserMenu from '../layouts/UserMenu';

const ClientSettings = ({ appState }) => {
  const { userId } = appState;

  return (
    <div>
      {userId
        ? (
          <UserMenu
            routes={appRoutes.client}
            userId={userId}
            menuButtons={clientPageItems}
          />
        ) : false}
      <div className="ui-component container-md">
        <div className="card text-center top-50 start-50 translate-middle">
          <SettingsHelper modelName="passengers" reqKey="passenger" />
        </div>
      </div>
    </div>
  );
};

ClientSettings.propTypes = {
  // match: PropTypes.objectOf(PropTypes.any).isRequired,
  appState: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default connect(mapStateToProps)(ClientSettings);
