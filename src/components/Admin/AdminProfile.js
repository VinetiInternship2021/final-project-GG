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
    <div>
      <div className="card text-center position-absolute top-50 start-50 translate-middle">
        {state.isLoading ? <Loading /> : false}
        <table className="table table-borderless">
          <ProfileInfoTable fieldsData={state.user} />
        </table>
      </div>
    </div>
  );
};

AdminProfile.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default AdminProfile;
