const findNearestDriverIndex = (response) => {
  const distanceMatrixArray = response.rows[0].elements;
  const distanceValues = distanceMatrixArray.map((value) => value.distance.value);

  distanceValues.sort((a, b) => a - b);

  const nearestdriverIndex = distanceMatrixArray.findIndex(
    (elem) => elem.distance.value === distanceValues[0],
  );

  return nearestdriverIndex;
};

export default findNearestDriverIndex;
