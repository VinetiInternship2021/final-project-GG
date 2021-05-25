import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Loader } from '@googlemaps/js-api-loader';
import { connect } from 'react-redux';
import { rating, appRoutes, clientPageButtons } from '../../utils/configs';
import { mapStateToProps } from '../../redux/actions';
import useDriversCoordinates from '../../hooks/useDriversCoordinates';
import useDistanceMatrix from '../../hooks/useDistanceMatrix';
import useNearestDriver from '../../hooks/useNearestDriver';
import useDriverArrival from '../../hooks/useDriverArrival';
import findNearestDriverIndex from '../../callbacks/findNearestDriverIndex';
import findReservationPrice from '../../callbacks/findReservationPrice';
import useMapLoader from '../../hooks/useMapLoader';
import useOnBeforeUnload from '../../hooks/useOnBeforeUnload';
import useRating from '../../hooks/useRating';
import '../../styles/map.css';
import UserMenu from '../layouts/UserMenu';

const loader = new Loader({
  apiKey: 'AIzaSyCDKUKfCo0eUyGRgdvlTwGnHXnWBtjyal4',
  version: 'weekly',
});

const Taxi = ({ appState }) => {
  const { userId, carType } = appState;

  const [message, setMessage] = useState('');
  const [pickUpLocation, setPickUpLocation] = useState();
  const [dropOffLocation, setDropOffLocation] = useState();
  const [nearestDriverIndex, setNearestDriverIndex] = useState();
  const [price, setPrice] = useState();
  const [showConfirmOrder, setShowConfirmOrder] = useState(false);
  const [showRate, setShowRate] = useState(false);
  const [count, setCount] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [status, setStatus] = useState('');
  const [reservationId, setReservationId] = useState('');
  const [rateValue, setRateValue] = useState();

  // Gets and sets the available drivers coordinates
  const { driversPosition, drivers } = useDriversCoordinates(carType);

  // delete reservation on page refresh or close
  useOnBeforeUnload(status, reservationId);

  // DistanceMatrix: finds the nearest driver to the passenger
  const findDriverIndex = (response) => {
    setNearestDriverIndex(findNearestDriverIndex(response));
  };

  useDistanceMatrix(driversPosition, pickUpLocation, findDriverIndex, window.google);

  // DistanceMatrix: finds the trip distance and calculate price based on vehicle type
  const findPrice = (response) => {
    let tripPrice = findReservationPrice(response, carType);

    if (tripPrice < 500) {
      tripPrice = 500;
    }

    setPrice(tripPrice);
    setMessage(`The price of your trip will be ${tripPrice} AMD`);
  };

  useDistanceMatrix(dropOffLocation, pickUpLocation, findPrice, window.google);

  // sends all gathered info to server for new resrevation, waits for confirmation from driver
  useNearestDriver(
    drivers,
    pickUpLocation,
    dropOffLocation,
    nearestDriverIndex,
    price,
    userId,
    count,
    setConfirmationMessage,
    setStatus,
    setReservationId,
  );

  useDriverArrival(userId, setConfirmationMessage, confirmationMessage, setShowRate);

  // loads the map, sets the pickup and dropoff locations via clicking
  const handleMap = useMapLoader(
    loader,
    setPickUpLocation,
    setDropOffLocation,
    setShowConfirmOrder,
  );

  // gets and sets the driver rating
  useRating(rateValue, userId);

  // rate the driver: not included yet
  const onSelect = (rate) => {
    setRateValue(rate);
    setMessage('Thank you for using our services.');
  };

  const rateButton = rating.map((rate) => (
    <div key={rate} className="form-check form-check-inline">
      <input onChange={() => onSelect(rate)} className="form-check-input" type="radio" name="inlineRadioOptions" id={rate} />
      <label className="form-check-label" htmlFor={rate}>{rate}</label>
    </div>
  ));

  return (
    <div>
      {userId
        && (
          <UserMenu
            routes={appRoutes.client}
            userId={userId}
            menuButtons={clientPageButtons}
          />
        )}
      <div className="ui-component container-md">
        <div className="card text-center border top-50 start-50 translate-middle" id="mapContainer">
          <p>Passenger Map</p>
          <div
            ref={handleMap}
            className="text-center border start-50 translate-middle maps"
          />
          { showRate
          && (
          <div className="text-center position-absolute bottom-0 start-50 translate-middle-x mb-4" id="rateButton">
            <p className="mb-1">Rate the driver</p>
            {rateButton}
          </div>
          )}
          <h6 className="text-center position-absolute bottom-100 start-50 translate-middle-x mb-2">{confirmationMessage}</h6>
          <h6 className="text-center position-absolute top-100 start-50 translate-middle-x mb-2">{message}</h6>
        </div>
        <div className="position-absolute start-100 translate-middle" id="passengerMapButtonsContainer">
          {showConfirmOrder
          && (
            <button
              type="button"
              onClick={() => {
                setShowConfirmOrder(false);
                setCount(true);
                setConfirmationMessage('waiting for confirmation from a driver');
              }}
              className="btn btn-outline-success "
            >
              Confirm Order
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

Taxi.propTypes = {
  appState: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default connect(mapStateToProps)(Taxi);
