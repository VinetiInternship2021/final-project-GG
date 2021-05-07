import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ProfileInfoTable from '../../utils/ProfileInfoTable';
import Loading from '../../shared/Animations/Loading';
import getUserData from '../../helpers/ProfilePageHelper';

const AdminProfile = ({ match }) => {
  const [state, setState] = useState({
    userId: match.params.id,
    isActive: false,
    userType: 'SuperUser',
    isLoading: true,
    apiUrl: '',
    user: {},
  });

  useEffect(() => {
    const modelName = 'super_users';
    getUserData({ state, setState, modelName })
      .then();
  });

  return (
    <div className="ui-component container-md">
      <div className="card text-center position-absolute top-50 start-50 translate-middle">
        {state.isLoading ? <Loading /> : false}
        <ProfileInfoTable fieldsData={state.user} />
      </div>
    </div>
  );
};

AdminProfile.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default AdminProfile;
