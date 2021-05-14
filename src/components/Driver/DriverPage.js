import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Loader } from '@googlemaps/js-api-loader';
import { connect } from 'react-redux';
import DriverMenu from '../../utils/DriverMenu';
import { baseUrl } from '../../utils/configs';
import { mapStateToProps } from '../../redux/actions';
import useMapLocatorRouter from '../../custom hooks/useMapLocatorRouter';
import '../../styles/map.css';

const loader = new Loader({
  apiKey: 'AIzaSyCDKUKfCo0eUyGRgdvlTwGnHXnWBtjyal4',
  version: 'weekly',
});

const DriverPage = ({ appState }) => {
  const state = appState;

  const menuItems = DriverMenu();
  const [showConfirm, setShowConfirm] = useState(false);
  const handleMap = useMapLocatorRouter(loader, state, setShowConfirm);

  const confirmation = () => {
    axios.post(`${baseUrl}/coordinates/confirm`, {
      id: state.userId,
    });
  };

  return (
    <div className="position-relative">
      <div className="card text-center position-absolute top-0 start-0 ms-4 mt-3" id="menuContainer">
        <ul className="list-group list-group-flush">
          {menuItems}
        </ul>
      </div>
      <div className="text-center border position-absolute top-50 start-50 translate-middle" id="mapContainer">
        <div ref={handleMap} className="text-center border position-absolute start-50 translate-middle mt-3" id="mapWindow" />
        {showConfirm ? <button type="button" onClick={confirmation} className="btn btn-outline-success position-absolute top-0 start-50 translate-middle">Confirm</button> : null}
      </div>

    </div>
  );
};

DriverPage.propTypes = {
  appState: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default connect(mapStateToProps)(DriverPage);
