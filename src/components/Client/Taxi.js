import React, { useState, useEffect, useCallback } from 'react';
import { rating } from '../../utils/configs';
import axios from 'axios';
import { Loader } from "@googlemaps/js-api-loader"
import { baseUrl } from "../../utils/configs";
import { mapStateToProps } from '../../redux/actions'
import { connect } from "react-redux";
import usePassengerCoordinates from '../../hooks/usePassengerCoordinates'

let toggle = true;
let count = 0
const loader = new Loader({
    apiKey: "AIzaSyCDKUKfCo0eUyGRgdvlTwGnHXnWBtjyal4",
    version: "weekly"
});

const Taxi = (props) => {
    let state = props.appState
    let log;

    const [message, setMessage] = useState('')
    const [pickUpLocation, SetPickUpLocation] = useState();
    const [dropOffLocation, SetDropOffLocation] = useState();
    const [driversPosition, SetDriversPosition] = useState();
    const [drivers, SetDrivers] = useState();
    const [distanceMatrix, SetDistanceMatrix] = useState();
    const [nearestDriverIndex, setNearestDriverIndex] = useState()
    const [price, setPrice] = useState();

    //----------------------Gets and sets the available drivers coordinates -------------------------------------------
    useEffect(() => {
        let source = axios.CancelToken.source();
        let config = { cancelToken: source.token }

        axios.get(`${baseUrl}/coordinates/drivers`, config)
            .then((response) => {
                console.log('response.data.drivers: ', response.data.drivers)
                SetDrivers(response.data.drivers)
                const coordinates = response.data.drivers.map((driver) => {
                    return { lat: parseFloat(driver.latitude), lng: parseFloat(driver.longitude) }
                })
                SetDriversPosition(coordinates)
            })
            .catch((error) => {
                // console.log(error);
            });
        return () => {
            source.cancel()
        }
    }, [])

    //----------------------DistanceMatrix: finds the nearest driver to the passenger-------------------------------------------
    let map;
    if (driversPosition && pickUpLocation) {
        let service = new window.google.maps.DistanceMatrixService();
        service.getDistanceMatrix(
            {
                origins: [pickUpLocation],
                destinations: driversPosition,
                travelMode: 'DRIVING',
            }, callback);

        function callback(response, status) {
            //BUG: on rare occasions response.rows[0] is undefined, should be fixed (lookup status)
            const distanceMatrixArray = response.rows[0].elements
            // console.log('distanceMatrixArray: ', distanceMatrixArray)
            const distanceValues = distanceMatrixArray.map((value) => {
                return value.distance.value
            })
            distanceValues.sort(function (a, b) {
                return a - b;
            });
            // console.log('distanceValues: ', distanceValues)
            const nearestDriverIndex = distanceMatrixArray.findIndex((elem) => {
                return elem.distance.value === distanceValues[0]
            })
            // console.log('nearestDriverIndex: ', nearestDriverIndex)
            // console.log('drivers: ', drivers)
            setNearestDriverIndex(nearestDriverIndex)

        }
    }

    //----------------------DistanceMatrix: finds the trip distance and calculate price based on vehicle type-------------------------------------------
    useEffect(() => {
        if (dropOffLocation && pickUpLocation) {
            let service = new window.google.maps.DistanceMatrixService();
            service.getDistanceMatrix(
                {
                    origins: [pickUpLocation],
                    destinations: [dropOffLocation],
                    travelMode: 'DRIVING',
                }, callback);

            function callback(response, status) {
                const distanceMatrixArrayClient = response.rows[0].elements
                // console.log('TripDistance: ', distanceMatrixArray)
                const distanceValue = distanceMatrixArrayClient.map((value) => {
                    return value.distance.value
                })
                distanceValue.sort(function (a, b) {
                    return a - b;
                });
                // console.log('distanceValues: ', distanceValues[0])

                let tripPrice = 0
                console.log('state.carType: ', state.carType)
                switch (state.carType) {
                    case "Econom":
                        tripPrice = distanceValue[0] / 1000 * 100
                        break;
                    case "Business":
                        tripPrice = distanceValue[0] / 1000 * 150
                        break;
                    case 'First class':
                        tripPrice = distanceValue[0] / 1000 * 200
                        break;
                    case 'Cargo van':
                        tripPrice = distanceValue[0] / 1000 * 250
                        break;
                    default:
                        tripPrice = 0
                }
                tripPrice = Math.round(tripPrice / 100) * 100
                setPrice(Math.round(tripPrice / 100) * 100)
                if (tripPrice < 500) {
                    tripPrice = 500
                    setPrice(500)
                }
                setMessage(`The price of your trip will be ${tripPrice} AMD`)
            }
        }
    }, [pickUpLocation, dropOffLocation])


    //----------------------sends all gathered info to server for new resrevation, waits for confirmation from driver-------------------------------------------

    // usePassengerCoordinates(pickUpLocation, dropOffLocation, drivers,nearestDriverIndex, price, state, setMessage)
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
                    // console.log('trip_nearestdriver response', response);
                    // check this clear Interval functionality
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
                    // console.log(error);
                });
        }
        return () => {
            source.cancel()
        }
    }, [pickUpLocation, dropOffLocation, drivers, nearestDriverIndex, price])


    //----------------------loads the map, sets the pickup and dropoff locations via clicking-------------------------------------------
    const myLatlng = { lat: 40.18, lng: 44.53 };
    const handleMap = useCallback((mapElement) => {
        if (mapElement == null) return;
        loader.load().then(() => {
            map = new window.google.maps.Map(mapElement, {
                center: myLatlng,
                zoom: 13,
            });
            map.addListener("click", (mapsMouseEvent) => {
                if (count < 2) {
                    if (toggle) {
                        const marker1 = new window.google.maps.Marker({
                            position: mapsMouseEvent.latLng,
                            map,
                            title: "Departure!",
                        });
                        count++
                        SetPickUpLocation(mapsMouseEvent.latLng);
                        toggle = false
                    } else {
                        const marker2 = new window.google.maps.Marker({
                            position: mapsMouseEvent.latLng,
                            map,
                            title: "Destination",
                        });
                        count++
                        SetDropOffLocation(mapsMouseEvent.latLng)
                        toggle = true
                    }
                }
            });
        })
    }, []);

    //----------------------rate the driver: not included yet -------------------------------------------
    const onSelect = (event) => {
        // event.preventDefault();
        axios.post('/taxi/rate', {
            rate: event.target.id
        })
            .then(function (response) {
                // console.log(response);
            })
            .catch(function (error) {
                // console.log(error);
            });
        setMessage('Thank you for using our services.')
    }

    const rateButton = rating.map((rate) => {
        return (
            <div key={rate} className="form-check form-check-inline">
                <input onChange={(event) => onSelect(event)} className="form-check-input" type="radio" name="inlineRadioOptions" id={rate} />
                <label className="form-check-label" htmlFor={rate}>{rate}</label>
            </div>
        )
    });

    return (
        <div className="text-center border position-absolute top-50 start-50 translate-middle" style={{ width: "700px", height: "670px" }}>
            <p>Taxi/map</p>
            <div ref={handleMap} className="text-center border position-absolute top-0 start-50 translate-middle mb-6" style={{ width: "660px", height: "500px" }} id="map"></div>
            <div className="text-center position-absolute bottom-0 start-50 translate-middle-x mb-4" style={{ width: "350px", height: "60px" }}>
                <p className="mb-1">Rate the driver</p>
                {rateButton}
            </div>
            <h6 className="text-center position-absolute bottom-0 start-50 translate-middle-x mb-2">{message}</h6>
        </div>
    )
}

export default connect(mapStateToProps)(Taxi)