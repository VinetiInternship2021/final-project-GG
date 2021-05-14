import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ProfileInfoTable from '../../utils/ProfileInfoTable';
import Loading from '../../shared/Animations/Loading';
import getUserData from '../../helpers/ProfilePageHelper';
import { DriverPageButtons, appRoutes } from '../../utils/configs';
import UserMenu from '../layouts/UserMenu';

const DriverProfile = ({ match: { params: { id } } }) => {
  const [state, setState] = useState({
    userId: id,
    isLoading: true,
    verified: 'bg-danger',
    user: {},
  });
  const { userId } = state;

  useEffect(() => {
    const modelName = 'drivers';
    getUserData({ state, setState, modelName });
    if (state.user.is_verified_by_admin) {
      setState({
        ...state,
        verified: 'bg-success',
      });
    }
  }, []);

  return (
    <div>
      {userId
        && (
          <UserMenu
            routes={appRoutes.driver}
            userId={userId}
            menuButtons={DriverPageButtons}
          />
        )}
      <div className="ui-component container-md">
        <div className="card text-center position-absolute top-50 start-50 translate-middle">
          {state.isLoading ? <Loading />
            : (
              <>
                <span className={`badge ${state.verified}`}>
                  {/* eslint-disable-next-line camelcase */}
                  {state.user.is_verified_by_admin ? 'Confirmed' : 'Unconfirmed'}
                </span>
                <ProfileInfoTable fieldsData={state.user} />
              </>
            )}
        </div>
      </div>
    </div>
  );
};

DriverProfile.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default DriverProfile;
