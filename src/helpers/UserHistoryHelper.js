import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import getUserData from './ProfilePageHelper';
import UserMenu from '../components/layouts/UserMenu';
import { appRoutes, clientPageButtons, DriverPageButtons } from '../utils/configs';
import Loading from '../shared/Animations/Loading';
import { mapStateToProps } from '../redux/actions';
import ReservationsListHelper from './ReservationsListHelper';

const DriverReservations = ({ appState: { userId }, modelName }) => {
  const [state, setState] = useState({
    userId,
    exist: false,
    isLoading: true,
    user: {
      reservations: [],
    },
  });

  let routes = null;
  let menuButtons = null;
  if (modelName === 'passengers') {
    routes = appRoutes.client;
    menuButtons = clientPageButtons;
  } else {
    routes = appRoutes.driver;
    menuButtons = DriverPageButtons;
  }

  useEffect(() => {
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
  }, [userId, state.isLoading]);

  return (
    <>
      {userId
      && (
        <UserMenu
          routes={routes}
          userId={userId}
          menuButtons={menuButtons}
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
  modelName: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(DriverReservations);
