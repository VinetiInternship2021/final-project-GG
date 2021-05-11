import React from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { appRoutes, clientPageItems, orderTypes } from '../../utils/configs';
import { PageButton } from '../Buttons';
import { mapStateToProps } from '../../redux/actions';
import UserMenu from '../layouts/UserMenu';

const ClientPage = ({ appState }) => {
  const history = useHistory();
  const { userId } = appState;

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
      key={order[0]}
      button={order[0]}
      onSelect={handleOrders}
      buttonClassName="grid"
      className={order[1]}
    />
  ));

  return (
    <div>
      {userId
        ? (
          <UserMenu
            routes={appRoutes.client}
            userId={userId}
            menuButtons={clientPageItems}
          />
        ) : false}
      <div className="ui-component container-md">
        <h5 className="mt-3 mb-3">Choose Vehicle Type</h5>
        {orderButton}
      </div>
    </div>
  );
};

ClientPage.propTypes = {
  // match: PropTypes.objectOf(PropTypes.any).isRequired,
  appState: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default connect(mapStateToProps)(ClientPage);
