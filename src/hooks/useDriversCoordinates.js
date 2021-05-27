import { useEffect, useState } from 'react';
import axios from 'axios';
import { baseUrl } from '../utils/configs';

const useDriversCoordinates = (carType, setDrivers) => {
  const [driversPosition, setDriversPosition] = useState();

  useEffect(() => {
    const source = axios.CancelToken.source();
    const config = { cancelToken: source.token };

    axios.post(`${baseUrl}/coordinates/drivers`,
      { carType },
      config)
      .then((response) => {
        console.log('active drivers: ', response.data.drivers);
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
  };
};

export default useDriversCoordinates;
