import { useEffect, useState } from 'react';
import axios from 'axios';
import { baseUrl } from '../utils/configs';

const useNearestDriver = (
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
) => {
  const [log, setlog] = useState();

  // unsubscribing from interval
  useEffect(() => () => {
    clearInterval(log);
  }, [log]);

  useEffect(() => {
    const source = axios.CancelToken.source();
    const config = { cancelToken: source.token };

    if (drivers && pickUpLocation && dropOffLocation
      && nearestDriverIndex !== undefined && price && count) {
      axios.post(`${baseUrl}/coordinates/reservation`, {
        pickUpLocation,
        dropOffLocation,
        driverId: drivers[nearestDriverIndex].id,
        passengerId: userId,
        price,
      }, config)

        .then((res) => {
          setStatus('reservation created');
          setReservationId(res.data.id);

          const IntervalLog = setInterval(
            () => {
              axios.post(`${baseUrl}/coordinates/driverAssigned`, {
                id: userId,
              })

                .then((response) => {
                  if (response.data.message !== 'error') {
                    setConfirmationMessage('your driver is on the way');

                    clearInterval(IntervalLog);
                  }
                })

                .catch((error) => {
                  console.log(error);
                });
            }, 3000,
          );

          setlog(IntervalLog);
        })

        .catch((error) => {
          console.log(error);
        });
    }

    return () => {
      source.cancel();
      clearInterval(log);
    };
  }, [pickUpLocation, dropOffLocation, drivers, nearestDriverIndex, price, count]);
};

export default useNearestDriver;
