import { useEffect } from 'react';
import axios from 'axios';
import { baseUrl } from '../utils/configs';

const usePassengerCoordinates = (
  pickUpLocation, dropOffLocation, drivers, nearestDriverIndex, price, state, setMessage, log,
) => {
  useEffect(() => {
    const source = axios.CancelToken.source();
    const config = { cancelToken: source.token };
    if (drivers && pickUpLocation && dropOffLocation && nearestDriverIndex !== undefined && price) {
      axios.post(`${baseUrl}/coordinates/trip_nearestdriver`, {
        pickUpLocation,
        dropOffLocation,
        driverId: drivers[nearestDriverIndex].id,
        passengerId: state.userId,
        price,
      }, config)
        .then(() => {
          clearInterval(log);
          // eslint-disable-next-line no-param-reassign
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
                //   console.log(error);
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
};

export default usePassengerCoordinates;
