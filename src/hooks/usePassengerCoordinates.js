import { useEffect } from 'react';
import axios from 'axios';
import { baseUrl } from "../utils/configs";

const usePassengerCoordinates = (pickUpLocation, dropOffLocation, drivers,nearestDriverIndex, price, state, setMessage) => {
    useEffect(() => {
        let source = axios.CancelToken.source();
        let config = { cancelToken: source.token }
        if (drivers && pickUpLocation && dropOffLocation && nearestDriverIndex !== undefined && price) {
            axios.post(`${baseUrl}/coordinates/trip_nearestdriver`, {
                pickUpLocation,
                dropOffLocation,
                driverId: drivers[nearestDriverIndex].id,
                passengerId: state.userId,
                price: price
            }, config)
                .then((response) => {
                    clearInterval(log)
                    log = setInterval(
                        () => {
                            axios.post(`${baseUrl}/coordinates/driverAssigned`, {
                                id: state.userId
                            })
                                .then((response) => {
                                    console.log('interval')
                                    if (response.data.message !== 'error') {
                                        setMessage('your driver is on the way')
                                        clearInterval(log);
                                    }
                                })
                                .catch((error) => {
                                    console.log(error);
                                })
                        }, 3000);
    
                })
                .catch((error) => {
                });
        }
        return () => {
            source.cancel()
        }
    }, [pickUpLocation, dropOffLocation, drivers, nearestDriverIndex, price])
}

export default usePassengerCoordinates

