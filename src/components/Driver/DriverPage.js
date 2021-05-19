import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Loader } from '@googlemaps/js-api-loader';
import { appRoutes, DriverPageButtons, baseUrl } from '../../utils/configs';
import useMapLocatorRouter from '../../hooks/useMapLocatorRouter';
import '../../styles/map.css';
import UserMenu from '../layouts/UserMenu';

const loader = new Loader({
  apiKey: 'AIzaSyCDKUKfCo0eUyGRgdvlTwGnHXnWBtjyal4',
  version: 'weekly',
});

const DriverPage = () => {
  const loggedIn = useSelector((state) => state.rootReducer.loggedIn);
  const userId = useSelector((state) => state.rootReducer.userId);

  const [showConfirm, setShowConfirm] = useState(false);

  const handleMap = useMapLocatorRouter(
    loader,
    userId,
    setShowConfirm,
    loggedIn,
  );

  const confirmation = () => {
    axios.post(`${baseUrl}/coordinates/confirm`, {
      id: userId,
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

export default DriverPage;
