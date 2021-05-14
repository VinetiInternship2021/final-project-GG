import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ProfileInfoTable from '../../utils/ProfileInfoTable';
import Loading from '../../shared/Animations/Loading';
import getUserData from '../../helpers/ProfilePageHelper';
import { AdminPageButtons, appRoutes } from '../../utils/configs';
import UserMenu from '../layouts/UserMenu';
import { mapStateToProps } from '../../redux/actions';
import UnverifiedDriverList from './verification/UnverifiedDriverList';

const AdminProfile = ({ match, appState }) => {
  const { userId } = appState;
  const [state, setState] = useState({
    userId: match.params.id,
    isLoading: true,
    user: {},
  });

  useEffect(() => {
    const modelName = 'super_users';
    getUserData({ state, setState, modelName });
  }, []);

  return (
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
        <div className="card text-center position-absolute top-50 start-50 translate-middle">
          {state.isLoading && <Loading />}
          <ProfileInfoTable fieldsData={state.user} />
          <hr />
          <h1>Unverified Drivers</h1>
          <hr />
          <UnverifiedDriverList />
        </div>
      </div>
    </div>
  );
};

AdminProfile.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
  appState: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default connect(mapStateToProps)(AdminProfile);
