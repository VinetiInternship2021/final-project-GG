import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ProfileInfoTable from '../../utils/ProfileInfoTable';
import Loading from '../../shared/Animations/Loading';
import getUserData from '../../helpers/ProfilePageHelper';

const DriverProfile = ({ match }) => {
  const [state, setState] = useState({
    userId: match.params.id,
    isActive: false,
    userType: 'Driver',
    isLoading: true,
    apiUrl: '',
    user: {},
  });

  useEffect(() => {
    const modelName = 'drivers';
    getUserData({ state, setState, modelName })
      .then();
  }, []);

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
DriverProfile.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default DriverProfile;
