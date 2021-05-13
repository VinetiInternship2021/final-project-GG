import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Loader } from '@googlemaps/js-api-loader';
import { connect } from 'react-redux';
import DriverMenu from '../../utils/DriverMenu';
import { baseUrl } from '../../utils/configs';
import { mapStateToProps } from '../../redux/actions';
import '../../styles/map.css';

const loader = new Loader({
  apiKey: 'AIzaSyCDKUKfCo0eUyGRgdvlTwGnHXnWBtjyal4',
  version: 'weekly',
});
const myLatlng = { lat: 40.18, lng: 44.53 };

const DriverPage = ({ appState }) => {
  const state = appState;
  const menuItems = DriverMenu();
  const [showConfirm, setShowConfirm] = useState(false);
  let map;
  let directionsService;
  let directionsRenderer;
  let log;

  const handleMap = useCallback((mapElement) => {
    if (mapElement == null) return;

    // map loading, binding the direction api to this map
    loader.load().then(() => {
      map = new window.google.maps.Map(mapElement, {
        center: myLatlng,
        zoom: 13,
      });
      directionsService = new window.google.maps.DirectionsService();
      directionsRenderer = new window.google.maps.DirectionsRenderer();
      directionsRenderer.setMap(map);

      // Gets and sends the driver location to sever
      const infoWindow = new window.google.maps.InfoWindow();
      if (navigator.geolocation) {
        const identifier = navigator.geolocation.watchPosition(
          (position) => {
            const pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
            axios.post(`${baseUrl}/drivers/coordinates`, {
              coordinates: {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
              },
              id: state.userId,
            })
              .then(() => {
                clearInterval(log);

                // waits for new order
                log = setInterval(
                  () => {
                    axios.post(`${baseUrl}/coordinates/trip`, {
                      id: state.userId,
                    })
                      .then((response) => {
                        if (response.data.data) {
                          navigator.geolocation.clearWatch(identifier);
                          setShowConfirm(true);
                          clearInterval(log);

                          // renders the new order route on the map
                          const request = {
                            origin: {
                              lat: parseFloat(response.data.data.pickupLat),
                              lng: parseFloat(response.data.data.pickupLng),
                            },
                            destination: {
                              lat: parseFloat(response.data.data.dropoffLat),
                              lng: parseFloat(response.data.data.dropoffLng),
                            },
                            travelMode: 'DRIVING',
                          };
                          directionsService.route(request, (result, status) => {
                            if (status === 'OK') {
                              directionsRenderer.setDirections(result);
                            }
                          });
                        }
                      })
                      .catch(() => {
                      });
                  }, 3000,
                );
              })
              .catch(() => {
              });

            infoWindow.setPosition(pos);
            infoWindow.setContent('Driver location.');
            infoWindow.open(map);
            map.setCenter(pos);
          },
          () => {
          },
        );
      }
    });
  }, []);

  const confirmation = () => {
    axios.post(`${baseUrl}/coordinates/confirm`, {
      id: state.userId,
    })
      .then(() => {
      })
      .catch(() => {
      });
  };

  return (
    <div className="position-relative">
      <div className="card text-center position-absolute top-0 start-0 ms-4 mt-3" id="menuContainer">
        <ul className="list-group list-group-flush">
          {menuItems}
        </ul>
      </div>
      <div className="text-center border position-absolute top-50 start-50 translate-middle" id="mapContainer">
        <div ref={handleMap} className="text-center border position-absolute start-50 translate-middle mt-3" id="mapWindow" />
        {showConfirm ? <button type="button" onClick={confirmation} className="btn btn-outline-success position-absolute top-0 start-50 translate-middle">Confirm</button> : null}
      </div>

    </div>
  );
};

DriverPage.propTypes = {
  appState: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default connect(mapStateToProps)(DriverPage);
