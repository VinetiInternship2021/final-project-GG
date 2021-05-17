import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { appRoutes, clientPageButtons } from '../../utils/configs';
import { mapStateToProps, createCarType } from '../../redux/actions';
import UserMenu from '../layouts/UserMenu';
import ClientMenu from '../layouts/ClientMenu';

const ClientPage = ({ appState, dispatch }) => {
  const history = useHistory();
  const { userId } = appState;
  const state = appState;

  const handleOrders = (order) => {
    dispatch(createCarType({
      ...state,
      type: order.target.outerText,
    }));
    history.push(appRoutes.taxi);
  };

  return (
    <div>
      {userId
        && (
          <UserMenu
            routes={appRoutes.client}
            userId={userId}
            menuButtons={clientPageButtons}
          />
        )}
      <div className="ui-component container-md">
        <div className="position-relative">
          <h5 className="mt-3 mb-3">Choose Vehicle Type</h5>
          <ClientMenu handleOrders={handleOrders} />
        </div>
      </div>
    </div>
  );
};

ClientPage.propTypes = {
  appState: PropTypes.objectOf(PropTypes.any).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(ClientPage);
