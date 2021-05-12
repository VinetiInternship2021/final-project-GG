import React, { useState } from 'react';

const Maps = (props) => {
  const params = props;
  const [mapsState] = useState(
    {
      mapsMode: 'view',
      key: 'AIzaSyBjx5b7HB5JDcHBXdGKfyYMKKZF4qJhtWg',
      origin: '',
      destination: '',
      center: params.center,
      zoom: params.zoom,
    },
  );
  const srcGenerator = () => {
    let src = '';
    switch (mapsState.mapsMode) {
      case 'view':
        src = `https://www.google.com/maps/embed/v1/${mapsState.mapsMode}?key=${mapsState.key}&center=${mapsState.center}&zoom=${mapsState.zoom}`;
        return src;
      case 'directions':
        src = `https://www.google.com/maps/embed/v1/${mapsState.mapsMode}?key=${mapsState.origin}&center=${mapsState.destination}`;
        return src;
      default:
        return src;
    }
  };
  return (
    <iframe
      title="Map"
      height="450"
      style={{ border: '0' }}
      loading="lazy"
      allowFullScreen
      src={srcGenerator()}
    />
  );
};
export default Maps;
