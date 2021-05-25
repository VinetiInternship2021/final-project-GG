import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import getUserData from '../../helpers/ProfilePageHelper';
import UserMenu from '../layouts/UserMenu';
import { appRoutes, DriverPageButtons } from '../../utils/configs';
import Loading from '../../shared/Animations/Loading';
import { mapStateToProps } from '../../redux/actions';
import ReservationsListHelper from '../../helpers/ReservationsListHelper';

const DriverReservations = ({ appState: { userId } }) => {
  const [state, setState] = useState({
    userId,
    exist: false,
    isLoading: true,
    user: {
      reservations: [],
    },
  });

  useEffect(() => {
    const modelName = 'drivers';
    if (typeof userId === 'number') {
      console.log('if');
      getUserData({
        state, setState, modelName, userId,
      })
        .then(() => {
          if (state.user.is_verified_by_admin) {
            setState({
              ...state,
              userId,
              isLoading: false,
              verified: 'bg-success',
            });
          }
        });
    } else {
      setState(
        {
          ...state,
          exist: false,
          isLoading: true,
        },
      );
    }
    console.log(state, ' effect');
  }, [userId, state.isLoading]);

  return (
    <>
      {userId
        && (
          <UserMenu
            routes={appRoutes.driver}
            userId={userId}
            menuButtons={DriverPageButtons}
          />
        )}
      {typeof userId === 'number'
      && (
        <>
          <div className="ui-component container-md">
            <div className="card text-center top-50 start-50 translate-middle">
              {state.isLoading ? <Loading />
                : (
                  <div className="list-group">
                    <ReservationsListHelper state={state} />
                  </div>
                )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

DriverReservations.propTypes = {
  appState: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default connect(mapStateToProps)(DriverReservations);
