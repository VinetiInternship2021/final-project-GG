import { useCallback } from 'react';
import useRoute from './useRoute';
import carIcon from '../icon/car-png2.png';

const useMapLoader = (
  loader,
  setPickUpLocation,
  setDropOffLocation,
  setShowConfirmOrder,
  drivers,
) => {
  const myLatlng = { lat: 40.18, lng: 44.53 };
  let map;
  let toggle = true;
  let count = 0;
  let directionsService;
  let directionsRenderer;
  let origin;
  let destination;
  let marker1;
  let marker2;

  const handleMap = useCallback((mapElement) => {
    if (!mapElement) return;

    loader.load().then(() => {
      map = new window.google.maps.Map(mapElement, {
        center: myLatlng,
        zoom: 13,
      });
      console.log('drivers in useMapLoader', drivers);
      if (drivers) {
        drivers.forEach((driver) => {
          const latlng = {
            lat: parseFloat(driver.latitude),
            lng: parseFloat(driver.longitude),
          };
          console.log('latlng: ', latlng);
          // eslint-disable-next-line no-unused-vars
          const marker = new window.google.maps.Marker({
            position: latlng,
            map,
            icon: carIcon,
            title: 'Departure!',
          });
        });
      }

      directionsService = new window.google.maps.DirectionsService();
      directionsRenderer = new window.google.maps.DirectionsRenderer();
      directionsRenderer.setMap(map);

      map.addListener('click', (mapsMouseEvent) => {
        if (count < 2) {
          if (toggle) {
            marker1 = new window.google.maps.Marker({
              position: mapsMouseEvent.latLng,
              map,
              title: 'Departure!',
            });

            count += 1;

            setPickUpLocation(mapsMouseEvent.latLng);

            origin = mapsMouseEvent.latLng;

            toggle = false;
          } else {
            marker2 = new window.google.maps.Marker({
              position: mapsMouseEvent.latLng,
              map,
              title: 'Destination',
            });

            count += 1;

            setDropOffLocation(mapsMouseEvent.latLng);

            destination = mapsMouseEvent.latLng;

            toggle = true;
          }

          // draw the trip route
          if (origin && destination) {
            setShowConfirmOrder(true);
            marker1.setMap(null);
            marker2.setMap(null);
            useRoute(directionsService, directionsRenderer, origin, destination);
          }
        }
      });
    });
  }, [drivers]);
  return handleMap;
};

export default useMapLoader;
