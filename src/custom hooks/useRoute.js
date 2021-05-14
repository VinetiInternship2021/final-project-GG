const useRoute = (directionsService, directionsRenderer, origin, destination) => {
  const request = {
    origin,
    destination,
    travelMode: 'DRIVING',
  };

  directionsService.route(request, (result, status) => {
    if (status === 'OK') {
      directionsRenderer.setDirections(result);
    }
  });
};

export default useRoute;
