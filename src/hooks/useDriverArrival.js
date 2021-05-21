import { useEffect, useState } from 'react';
import axios from 'axios';
import { baseUrl } from '../utils/configs';

const useDriverArrival = (
  userId,
  setConfirmationMessage,
  confirmationMessage,
  setShowRate,
) => {
  const [log, setlog] = useState();

  // unsubscribing from interval
  useEffect(() => () => {
    clearInterval(log);
  }, [log]);

  useEffect(() => {
    if (confirmationMessage === 'your driver is on the way') {
      const IntervalLog = setInterval(
        () => {
          axios.post(`${baseUrl}/coordinates/driverArrived`, {
            id: userId,
          })

            .then((response) => {
              if (response.data.message !== 'error') {
                setConfirmationMessage('Your driver has arrived!');
                setShowRate(true);
                clearInterval(IntervalLog);
              }
            })

            .catch((error) => {
              console.log(error);
            });
        }, 3000,
      );

      setlog(IntervalLog);
    }

    return () => {
      clearInterval(log);
    };
  }, [confirmationMessage]);
};

export default useDriverArrival;
