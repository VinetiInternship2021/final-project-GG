import { useEffect } from 'react';

const useDistanceMatrix = (origins, destinations, callback, google) => {
  useEffect(() => {
    if (origins && destinations) {
      let dest = destinations;
      let org = origins;
      if (!Array.isArray(dest)) {
        dest = [dest];
      }
      if (!Array.isArray(org)) {
        org = [org];
      }
      const service = new google.maps.DistanceMatrixService();
      service.getDistanceMatrix(
        {
          origins: org,
          destinations: dest,
          travelMode: 'DRIVING',
        }, callback,
      );
    }
  }, [origins, destinations]);
};

export default useDistanceMatrix;
