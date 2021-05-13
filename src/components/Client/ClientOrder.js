import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { appRoutes, orderTypes } from '../../utils/configs';
import { ClientMenu } from '../../utils/ClientMenu';
import { mapStateToProps, createCarType } from '../../redux/actions';

const ClientPage = ({ appState, dispatch }) => {
  const state = appState;
  const history = useHistory();
  const menuItems = ClientMenu();

  const handleOrders = (order) => {
    dispatch(createCarType({
      ...state,
      type: order,
    }));
    history.push(appRoutes.taxi);
  };

  const orderButton = orderTypes.map((order) => (
    <div key={order}>
      <button onClick={() => handleOrders(order)} className="btn btn-outline-success mb-1 w-50" type="submit">{order}</button>
      <br />
    </div>
  ));

  return (
    <div className="position-relative">
      <div>
        <ul className="list-group list-group-flush">
          {menuItems}
        </ul>
      </div>

      <div className="card text-center border position-fixed top-50 start-50 translate-middle" id="vehicleTypeContainer">
        <h5 className="mt-1 mb-3">Choose Vehicle Type</h5>
        {orderButton}
      </div>
    </div>
  );
};

ClientPage.propTypes = {
  appState: PropTypes.objectOf(PropTypes.any).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(ClientPage);
