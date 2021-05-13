import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Loader } from '@googlemaps/js-api-loader';
import { connect } from 'react-redux';
import { rating } from '../../utils/configs';
import { mapStateToProps } from '../../redux/actions';
import useDriverCoordinates from '../../custom hooks/useDriversCoordinates';
import useDistanceMatrix from '../../custom hooks/useDistanceMatrix';
import useNearestDriver from '../../custom hooks/useNearestDriver';
import findNearestDriverIndex from '../../callbacks/findNearestDriverIndex';
import findReservationPrice from '../../callbacks/findReservationPrice';
import '../../styles/map.css';

let toggle = true;

let count = 0;

const loader = new Loader({

  apiKey: 'AIzaSyCDKUKfCo0eUyGRgdvlTwGnHXnWBtjyal4',
  version: 'weekly',

});

const Taxi = ({ appState }) => {
  const state = appState;

  let map;

  const [message, setMessage] = useState('');

  const [pickUpLocation, setPickUpLocation] = useState();

  const [dropOffLocation, setDropOffLocation] = useState();

  const [nearestDriverIndex, setNearestDriverIndex] = useState();

  const [price, setPrice] = useState();

  // Gets and sets the available drivers coordinates
  const { driversPosition, drivers } = useDriverCoordinates();

  // DistanceMatrix: finds the nearest driver to the passenger
  const findDriverIndex = (response) => {
    setNearestDriverIndex(findNearestDriverIndex(response));
  };

  // useDistanceMatrix({
  //   origins: driversPosition,
  //   destinatins: pickUpLocation,
  //   callback: findDriverIndex,
  //   google: window.google,
  // });
  useDistanceMatrix(
    driversPosition,
    pickUpLocation,
    findDriverIndex,
    window.google,
  );

  // DistanceMatrix: finds the trip distance and calculate price based on vehicle type
  const findPrice = (response) => {
    let tripPrice = findReservationPrice(response, state);

    if (tripPrice < 500) {
      tripPrice = 500;
    }

    setPrice(tripPrice);

    setMessage(`The price of your trip will be ${tripPrice} AMD`);
  };

  useDistanceMatrix(dropOffLocation, pickUpLocation, findPrice, window.google);

  // sends all gathered info to server for new resrevation, waits for confirmation from driver
  const conformationMessage = useNearestDriver(drivers, pickUpLocation, dropOffLocation,

    nearestDriverIndex, price, state);

  // loads the map, sets the pickup and dropoff locations via clicking
  const myLatlng = { lat: 40.18, lng: 44.53 };

  const handleMap = useCallback((mapElement) => {
    if (!mapElement) return;

    loader.load().then(() => {
      map = new window.google.maps.Map(mapElement, {

        center: myLatlng,
        zoom: 13,

      });

      map.addListener('click', (mapsMouseEvent) => {
        if (count < 2) {
          if (toggle) {
            // eslint-disable-next-line no-unused-vars
            const marker1 = new window.google.maps.Marker({

              position: mapsMouseEvent.latLng,
              map,
              title: 'Departure!',

            });

            count += 1;

            setPickUpLocation(mapsMouseEvent.latLng);

            toggle = false;
          } else {
            // eslint-disable-next-line no-unused-vars
            const marker2 = new window.google.maps.Marker({

              position: mapsMouseEvent.latLng,
              map,
              title: 'Destination',

            });

            count += 1;

            setDropOffLocation(mapsMouseEvent.latLng);

            toggle = true;
          }
        }
      });
    });
  }, []);

  // rate the driver: not included yet
  const onSelect = (event) => {
    axios.post('/taxi/rate', {
      rate: event.target.id,
    })

      .then(() => {
      })

      .catch(() => {
      });

    setMessage('Thank you for using our services.');
  };

  const rateButton = rating.map((rate) => (
    <div key={rate} className="form-check form-check-inline">
      <input onChange={(event) => onSelect(event)} className="form-check-input" type="radio" name="inlineRadioOptions" id={rate} />
      <label className="form-check-label" htmlFor={rate}>{rate}</label>
    </div>
  ));

  return (
    <div className="text-center border position-absolute top-50 start-50 translate-middle" id="mapContainer">
      <p>Taxi/map</p>
      <div ref={handleMap} className="text-center border position-absolute top-0 start-50 translate-middle mb-6" id="mapWindow" />
      <div className="text-center position-absolute bottom-0 start-50 translate-middle-x mb-4" id="rateButton">
        <p className="mb-1">Rate the driver</p>
        {rateButton}
      </div>
      <h6 className="text-center position-absolute start-50 translate-middle-x mb-2">{conformationMessage}</h6>
      <h6 className="text-center position-absolute bottom-0 start-50 translate-middle-x mb-2">{message}</h6>
    </div>
  );
};

Taxi.propTypes = {
  appState: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default connect(mapStateToProps)(Taxi);
