// export function callback1(response, status) {
//   // BUG: on rare occasions response.rows[0] is undefined, should be fixed (lookup status)
//   const distanceMatrixArray = response.rows[0].elements;
//   // console.log('distanceMatrixArray: ', distanceMatrixArray)
//   const distanceValues = distanceMatrixArray.map((value) => value.distance.value);
//   distanceValues.sort((a, b) => a - b);
//   // console.log('distanceValues: ', distanceValues)
//   const ndriverIndex = distanceMatrixArray.findIndex(
//     (elem) => elem.distance.value === distanceValues[0],
//   );
//     // console.log('nearestDriverIndex: ', nearestDriverIndex)
//     // console.log('drivers: ', drivers)
//   setNearestDriverIndex(ndriverIndex);
// }

// export function callback2(response, status) {
//   const distanceMatrixArrayClient = response.rows[0].elements;
//   // console.log('TripDistance: ', distanceMatrixArray)
//   const distanceValue = distanceMatrixArrayClient.map((value) => value.distance.value);
//   distanceValue.sort((a, b) => a - b);
//   // console.log('distanceValues: ', distanceValues[0])

//   let tripPrice = 0;
//   // console.log('state.carType: ', state.carType);
//   switch (state.carType) {
//     case 'Econom':
//       tripPrice = (distanceValue[0] / 1000) * 100;
//       break;
//     case 'Business':
//       tripPrice = (distanceValue[0] / 1000) * 150;
//       break;
//     case 'First class':
//       tripPrice = (distanceValue[0] / 1000) * 200;
//       break;
//     case 'Cargo van':
//       tripPrice = (distanceValue[0] / 1000) * 250;
//       break;
//     default:
//       tripPrice = 0;
//   }
//   tripPrice = Math.round(tripPrice / 100) * 100;
//   setPrice(Math.round(tripPrice / 100) * 100);
//   if (tripPrice < 500) {
//     tripPrice = 500;
//     setPrice(500);
//   }
//   setMessage(`The price of your trip will be ${tripPrice} AMD`);
// }
