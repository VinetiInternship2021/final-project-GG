import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Loader } from '@googlemaps/js-api-loader';
import { appRoutes, DriverPageButtons, baseUrl } from '../../utils/configs';
import { mapStateToProps } from '../../redux/actions';
import useMapLocatorRouter from '../../custom hooks/useMapLocatorRouter';
import '../../styles/map.css';
import UserMenu from '../layouts/UserMenu';

const loader = new Loader({
  apiKey: 'AIzaSyCDKUKfCo0eUyGRgdvlTwGnHXnWBtjyal4',
  version: 'weekly',
});

const DriverPage = ({ appState }) => {
  const { userId } = appState;
  const state = appState;

  const [showConfirm, setShowConfirm] = useState(false);
  const handleMap = useMapLocatorRouter(loader, state, setShowConfirm);

  const confirmation = () => {
    axios.post(`${baseUrl}/coordinates/confirm`, {
      id: state.userId,
    });
  };

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
      <div className="text-center border position-absolute top-50 start-50 translate-middle" id="mapContainer">
        <p>Driver Map</p>
        <div
          ref={handleMap}
          className="text-center border position-absolute top-0 start-50 translate-middle maps"
        />
        {showConfirm
          && (
            <button
              type="button"
              onClick={confirmation}
              className="btn btn-outline-success position-absolute bottom-0 start-50 translate-middle-x ms-0"
            >
              Confirm
            </button>
          )}
      </div>
    </div>
  );
};

DriverPage.propTypes = {
  appState: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default connect(mapStateToProps)(DriverPage);
