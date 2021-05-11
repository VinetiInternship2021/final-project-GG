import React from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { appRoutes, orderTypes } from '../../utils/configs';
import { ClientMenu } from '../../utils/ClientMenu';
import { mapStateToProps, createCarType } from '../../redux/actions';

// eslint-disable-next-line react/prop-types
const ClientPage = ({ appState, dispatch }) => {
  const state = appState;
  // const { ispatch } = props;
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
      <div className="card text-center position-absolute top-0 start-0 ms-4 mt-3" style={{ width: '150px', height: '125px' }}>
        <ul className="list-group list-group-flush">
          {menuItems}
        </ul>
      </div>

      <div className="card text-center border position-fixed top-50 start-50 translate-middle" style={{ width: '300px', height: '280px' }}>
        <h5 className="mt-3 mb-3">Choose Vehicle Type</h5>
        {orderButton}
      </div>
    </div>
  );

  //   return (
  //     <div>
  //       <div className="menu">
  //         <ul>
  //           <ClientMenu />
  //         </ul>
  //       </div>
  //       <div className="ui-component container-md">
  //         <h5 className="mt-3 mb-3">Choose Vehicle Type</h5>
  //         {orderButton}
  //       </div>
  //     </div>
  //   );
};

export default connect(mapStateToProps)(ClientPage);
