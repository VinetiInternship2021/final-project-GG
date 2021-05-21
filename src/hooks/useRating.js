import { useEffect } from 'react';
import axios from 'axios';
import { baseUrl } from '../utils/configs';

const useRating = (rate, passengerId) => {
  useEffect(() => {
    if (rate) {
      axios.post(`${baseUrl}/coordinates/rateDriver`, {
        rate,
        passengerId,
      })
        .then((response) => { console.log('add driver rating to reservation, response :', response); });
    }
  }, [rate, passengerId]);
};

export default useRating;
