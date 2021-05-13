function findReservationPrice(response, state) {
  const distanceMatrixArrayClient = response.rows[0].elements;
  const distanceValue = distanceMatrixArrayClient.map((value) => value.distance.value);
  distanceValue.sort((a, b) => a - b);
  let tripPrice = 0;
  switch (state.carType) {
    case 'Econom':
      tripPrice = (distanceValue[0] / 1000) * 100;
      break;
    case 'Business':
      tripPrice = (distanceValue[0] / 1000) * 150;
      break;
    case 'First class':
      tripPrice = (distanceValue[0] / 1000) * 200;
      break;
    case 'Cargo van':
      tripPrice = (distanceValue[0] / 1000) * 250;
      break;
    default:
      tripPrice = 0;
  }
  tripPrice = Math.round(tripPrice / 100) * 100;
  return tripPrice;
}

export default findReservationPrice;
