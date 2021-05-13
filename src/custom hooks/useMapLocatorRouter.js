import { useCallback } from 'react';
import axios from 'axios';
import { baseUrl } from '../utils/configs';
import useRoute from './useRoute';

const useMapLocatorRouter = (loader, state, setShowConfirm) => {
  const myLatlng = { lat: 40.18, lng: 44.53 };
  let directionsService;
  let directionsRenderer;
  let map;
  let log;

  const handleMap = useCallback((mapElement) => {
    if (!mapElement) return;

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
                          const origin = {
                            lat: parseFloat(response.data.data.pickupLat),
                            lng: parseFloat(response.data.data.pickupLng),
                          };
                          const destination = {
                            lat: parseFloat(response.data.data.dropoffLat),
                            lng: parseFloat(response.data.data.dropoffLng),
                          };
                          useRoute(directionsService, directionsRenderer, origin, destination);
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

  return handleMap;
};

export default useMapLocatorRouter;
