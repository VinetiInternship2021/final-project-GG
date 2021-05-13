import { useEffect, useState } from 'react';
import axios from 'axios';
import { baseUrl } from '../utils/configs';

const useNearestDriver = (drivers, pickUpLocation, dropOffLocation,
  nearestDriverIndex, price, state) => {
  const [message, setMessage] = useState();
  let log;
  useEffect(() => {
    const source = axios.CancelToken.source();
    const config = { cancelToken: source.token };
    if (drivers && pickUpLocation && dropOffLocation
      && nearestDriverIndex !== undefined && price) {
      axios.post(`${baseUrl}/coordinates/trip_nearestdriver`, {
        pickUpLocation,
        dropOffLocation,
        driverId: drivers[nearestDriverIndex].id,
        passengerId: state.userId,
        price,
      }, config)
        .then(() => {
          clearInterval(log);
          log = setInterval(
            () => {
              axios.post(`${baseUrl}/coordinates/driverAssigned`, {
                id: state.userId,
              })
                .then((response) => {
                  if (response.data.message !== 'error') {
                    setMessage('your driver is on the way');
                    clearInterval(log);
                  }
                })
                .catch(() => {
                });
            }, 3000,
          );
        })
        .catch(() => {
        });
    }
    return () => {
      source.cancel();
    };
  }, [pickUpLocation, dropOffLocation, drivers, nearestDriverIndex, price]);
  return message;
};

export default useNearestDriver;
