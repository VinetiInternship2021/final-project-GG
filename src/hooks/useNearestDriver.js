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
  setConformationMessage,
  setStatus,
  setReservationId,
) => {
  const [log, setlog] = useState();

  useEffect(() => {
    const source = axios.CancelToken.source();
    const config = { cancelToken: source.token };

    if (drivers && pickUpLocation && dropOffLocation
      && nearestDriverIndex !== undefined && price && count) {
      axios.post(`${baseUrl}/coordinates/trip_nearestdriver`, {
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
                    setConformationMessage('your driver is on the way');

                    clearInterval(log);
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
