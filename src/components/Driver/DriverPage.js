import React, { useState, useCallback } from 'react';
import { DriverMenu } from '../../utils/DriverMenu';
import axios from 'axios';
import { Loader } from "@googlemaps/js-api-loader"
import { baseUrl } from "../../utils/configs";
import { mapStateToProps } from '../../redux/actions';
import { connect } from "react-redux";

const loader = new Loader({
  apiKey: "AIzaSyCDKUKfCo0eUyGRgdvlTwGnHXnWBtjyal4",
  version: "weekly"
});
const myLatlng = { lat: 40.18, lng: 44.53 };

const DriverPage = (props) => {

  let state = props.appState;
  const menuItems = DriverMenu();
  const [showConfirm, setShowConfirm] = useState(false);
  let map;
  let directionsService;
  let directionsRenderer;
  let log;

  const handleMap = useCallback((mapElement) => {
    if (mapElement == null) return;

    //-------------------------------------- map loading, binding the direction api to this map -------------------------------------------
    loader.load().then(() => {
      map = new window.google.maps.Map(mapElement, {
        center: myLatlng,
        zoom: 13,
      })
      directionsService = new window.google.maps.DirectionsService();
      directionsRenderer = new window.google.maps.DirectionsRenderer();
      directionsRenderer.setMap(map);

    //----------------------Gets and sends the driver location to sever -------------------------------------------
      const infoWindow = new google.maps.InfoWindow();
      if (navigator.geolocation) {
        let identifier = navigator.geolocation.watchPosition(
          (position) => {
            const pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
            // console.log('watchPosition :', pos)
            axios.post(`${baseUrl}/drivers/coordinates`, {
              coordinates: {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
              },
              id: state.userId
            })
              .then((response) => {
                // console.log('drivers location response:', response);
                clearInterval(log)

    //----------------------------------- waits for new order -------------------------------------------
                log = setInterval(
                  () => {
                    axios.post(`${baseUrl}/coordinates/trip`, {
                      id: state.userId
                    })
                      .then((response) => {
                        console.log('interval')
                        if (response.data.data) {
                          navigator.geolocation.clearWatch(identifier)
                          setShowConfirm(true)
                          // console.log('response from client: ', response)
                          clearInterval(log);


    //----------------------------------- renders the new order route on the map -------------------------------------------                      
                          let request = {
                            origin: { lat: parseFloat(response.data.data.pickupLat), lng: parseFloat(response.data.data.pickupLng) },
                            destination: { lat: parseFloat(response.data.data.dropoffLat), lng: parseFloat(response.data.data.dropoffLng) },
                            travelMode: 'DRIVING'
                          };
                          directionsService.route(request, function (result, status) {
                            if (status === 'OK') {
                              console.log(result)
                              directionsRenderer.setDirections(result);
                            }
                          });
                        }
                      })
                      .catch((error) => {
                        console.log(error);
                      })
                  }, 3000);
              })
              .catch((error) => {
                console.log('drivers location response error:', error);
              });

            infoWindow.setPosition(pos);
            infoWindow.setContent("Driver location.");
            infoWindow.open(map);
            map.setCenter(pos);
          },
          () => {
            handleLocationError(true, infoWindow, map.getCenter());
          }
        );
      } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
      }
    })
  }, [])

  const confirmation = () => {
    axios.post(`${baseUrl}/coordinates/confirm`, {
      id: state.userId
    })
      .then((response) => {
        console.log('confirmation response: ', response)
      })
      .catch((error) => {
      })
  }

  return (
    <div className="position-relative">
      <div className="card text-center position-absolute top-0 start-0 ms-4 mt-3" style={{ width: "150px", height: "166px" }}>
        <ul className="list-group list-group-flush">
          {menuItems}
        </ul>
      </div>
      <div ref={handleMap} className="text-center border position-absolute top-50 start-50 translate-middle mb-6" style={{ width: "660px", height: "500px" }} ></div>
      {showConfirm ? <button onClick={confirmation} className="btn btn-outline-success position-absolute top-50 start-50 translate-middle">Confirm</button> : null}
    </div>
  )
}

export default connect(mapStateToProps)(DriverPage)