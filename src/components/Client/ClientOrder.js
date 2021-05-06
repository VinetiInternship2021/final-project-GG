import React from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { appRoutes, orderTypes } from '../../utils/configs';
import { ClientMenu } from '../../utils/ClientMenu';
import { PageButton } from '../Buttons';

const ClientPage = () => {
  const history = useHistory();

  const handleOrders = (order) => {
    axios.post('/client/order', {
      order,
    })
      .then((response) => response)
      .catch((error) => error);
    history.push(appRoutes.taxi);
  };

  const orderButton = orderTypes.map((order) => (
    <PageButton
      button={order[0]}
      onSelect={handleOrders}
      buttonClassName="grid"
      className={order[1]}
    />
  ));

  return (
  // <div className="position-relative">
    // eslint-disable-next-line max-len
  //     <div className="card text-center position-absolute top-0 start-0 ms-4 mt-3" style={{ width: "150px", height: "125px" }}>
  // {/*    <ul className="list-group list-group-flush">*/}
  // {/*        {menuItems}*/}
  // {/*    </ul>*/}
  // {/*</div>*/}
    // eslint-disable-next-line max-len
  // <div className="card text-center border position-fixed top-50 start-50 translate-middle" style={{ width: "300px", height: "280px" }}>
    <div>
      <div className="menu">
        <ul>
          <ClientMenu />
        </ul>
      </div>

      {/* eslint-disable-next-line max-len */}
      {/* Block with className="ui-component container-md" intended for inserting users functionality (f.e. Maps) */}
      <div className="ui-component container-md">
        <h5 className="mt-3 mb-3">Choose Vehicle Type</h5>
        {orderButton}
      </div>
    </div>
  );
};

export default ClientPage;
