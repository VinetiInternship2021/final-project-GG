import { useEffect } from 'react';
import axios from 'axios';
import { baseUrl } from '../utils/configs';

const useOnBeforeUnload = (status, reservationId) => {
  useEffect(() => {
    window.onbeforeunload = () => {
      if (status === 'reservation created') {
        axios.delete(`${baseUrl}/coordinates/reservation`, {
          data: {
            reservationId,
          },
        })

          .then((response) => { console.log('delete reservation response :', response); });
      }
    };

    return () => {
      window.onbeforeunload = null;
    };
  }, [status, reservationId]);
};

export default useOnBeforeUnload;
