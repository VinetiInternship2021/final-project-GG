import { useEffect, useState } from 'react';
import axios from 'axios';
import { baseUrl } from '../utils/configs';

const useDriversCoordinates = () => {
  const [driversPosition, setDriversPosition] = useState();

  const [drivers, setDrivers] = useState();

  useEffect(() => {
    const source = axios.CancelToken.source();

    const config = { cancelToken: source.token };

    axios.get(`${baseUrl}/coordinates/drivers`, config)

      .then((response) => {
        setDrivers(response.data.drivers);

        const coordinates = response.data.drivers.map((driver) => ({

          lat: parseFloat(driver.latitude),

          lng: parseFloat(driver.longitude),
        }));

        setDriversPosition(coordinates);
      })

      .catch((error) => {
        console.log(error);
      });

    return () => {
      source.cancel();
    };
  }, []);

  return {
    driversPosition,
    drivers,
  };
};

export default useDriversCoordinates;
