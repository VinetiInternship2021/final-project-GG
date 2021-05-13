import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { appRoutes, clientPageItems, orderTypes } from '../../utils/configs';
import { PageButton } from '../Buttons';
import { mapStateToProps, createCarType } from '../../redux/actions';
import UserMenu from '../layouts/UserMenu';

const ClientPage = ({ appState, dispatch }) => {
  const history = useHistory();
  const { userId } = appState;
  const state = appState;
  // import { ClientMenu } from '../../utils/ClientMenu';

  const handleOrders = (order) => {
    dispatch(createCarType({
      ...state,
      type: order,
    }));
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
        <div className="position-relative">
          <h5 className="mt-3 mb-3">Choose Vehicle Type</h5>
          {orderButton}
        </div>
      </div>
    </div>
  );
};

ClientPage.propTypes = {
  // match: PropTypes.objectOf(PropTypes.any).isRequired,
  appState: PropTypes.objectOf(PropTypes.any).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(ClientPage);
