import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { AdminPageButtons, appRoutes } from '../../utils/configs';
import UserMenu from '../layouts/UserMenu';
import { mapStateToProps } from '../../redux/actions';

const AdminPage = ({ appState: { userId } }) => (
  <div>
    {userId
      && (
        <UserMenu
          routes={appRoutes.admin}
          userId={userId}
          menuButtons={AdminPageButtons}
        />
      )}
    <div className="ui-component container-md">
      <h1>User functionality container</h1>
    </div>
  </div>
);

AdminPage.propTypes = {
  appState: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default connect(mapStateToProps)(AdminPage);
