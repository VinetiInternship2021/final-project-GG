import React from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { appRoutes, clientPageItems, orderTypes } from '../../utils/configs';
import { PageButton } from '../Buttons';
import MenuHelper from '../../helpers/MenuHelper';
import { mapStateToProps } from '../../redux/actions';

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

  const onSelect = (event) => {
    const user = appRoutes.client;
    const path = MenuHelper({ event, userId, user });
    history.push(path);
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

  const buttons = clientPageItems.map((item) => (
    <PageButton
      key={item[0]}
      button={item[0]}
      onSelect={onSelect}
      buttonClassName="column"
      className={item[1]}
    />
  ));

  return (
    <div>
      <div className="menu">
        <ul>
          {buttons}
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

ClientPage.propTypes = {
  // match: PropTypes.objectOf(PropTypes.any).isRequired,
  appState: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default connect(mapStateToProps)(ClientPage);
