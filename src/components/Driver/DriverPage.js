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
  const userId = useSelector((state) => state.rootReducer.userId);

  const [showConfirm, setShowConfirm] = useState(false);
  const [showArrived, setShowArrived] = useState(false);
  const [showPickup, setShowPickup] = useState(false);
  const [showComplete, setShowComplete] = useState(false);
  const [message, setMessage] = useState('');

  const handleMap = useMapLocatorRouter(
    loader,
    userId,
    setShowConfirm,
    setMessage,
  );

  const confirmation = () => {
    axios.post(`${baseUrl}/coordinates/confirm`, {
      id: userId,
    })
      .then(() => {
        setMessage('Approach to the pickup location, then click arrived button. The passenger will be notified.');
        setShowConfirm(false);
        setShowArrived(true);
      });
  };

  const arrived = () => {
    axios.post(`${baseUrl}/coordinates/arrived`, {
      id: userId,
    })
      .then(() => {
        setMessage('Pickup the passenger, then click pickup button.');
        setShowArrived(false);
        setShowPickup(true);
      });
  };

  const pickup = () => {
    axios.post(`${baseUrl}/coordinates/pickup`, {
      id: userId,
    })
      .then(() => {
        setMessage('Ride started. Complete the order, then click on complete button.');
        setShowPickup(false);
        setShowComplete(true);
      });
  };

  const complete = () => {
    axios.post(`${baseUrl}/coordinates/complete`, {
      id: userId,
    })
      .then(() => {
        setMessage('Ride completed.');
        setShowComplete(false);
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
      <div className="ui-component container-md">
        <div className="card text-center border top-50 start-50 translate-middle" id="mapContainer">
          <p data-testid="title">Driver Map</p>
          <h6>{message}</h6>
          <div
            ref={handleMap}
            className="text-center border start-50 translate-middle maps"
          />
        </div>
        <div className="position-absolute start-100 translate-middle" id="passengerMapButtonsContainer">
          {showConfirm
          && (
            <button
              data-testid="confirmation-button"
              type="button"
              onClick={confirmation}
              className="btn btn-outline-success position-absolute bottom-0 start-50 translate-middle-x ms-0"
            >
              Confirm
            </button>
          )}
          {showArrived
          && (
            <button
              type="button"
              onClick={arrived}
              className="btn btn-outline-success position-absolute bottom-0 start-50 translate-middle-x ms-0"
            >
              Arrived
            </button>
          )}
          {showPickup
          && (
            <button
              type="button"
              onClick={pickup}
              className="btn btn-outline-success position-absolute bottom-0 start-50 translate-middle-x ms-0"
            >
              Pickup
            </button>
          )}
          {showComplete
          && (
            <button
              type="button"
              onClick={complete}
              className="btn btn-outline-success position-absolute bottom-0 start-50 translate-middle-x ms-0"
            >
              Complete
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DriverPage;
