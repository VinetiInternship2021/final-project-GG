import React from 'react';
import { useHistory } from 'react-router-dom';
import { appRoutes, orderTypes } from '../../utils/configs';
import { ClientMenu } from '../../utils/ClientMenu';
import { connect } from "react-redux";
import { mapStateToProps } from '../../redux/actions';
import { createCarType } from "../../redux/actions";

const ClientPage = (props) => {
    const state = props.appState
    const dispatch = props.dispatch
    const history = useHistory();
    const menuItems = ClientMenu();

    const handleOrders = (order) => {
        dispatch(createCarType({
            ...state,
            'type': order
        }))
        history.push(appRoutes.taxi)
    }

    const orderButton = orderTypes.map((order) => {
        return (
            <div key={order}>
                <button onClick={() => handleOrders(order)} className="btn btn-outline-success mb-1 w-50" type="submit">{order}</button>
                <br />
            </div>
        )
    })
      .then((response) => response)
      .catch((error) => error);
    history.push(appRoutes.taxi);
  // };

  // const orderButton = orderTypes.map((order) => (
  //   <PageButton
  //     button={order[0]}
  //     onSelect={handleOrders}
  //     buttonClassName="grid"
  //     className={order[1]}
  //   />
  // ));

  return (
    <div>
      <div className="menu">
        <ul>
          <ClientMenu />
        </ul>
      </div>
      <div className="ui-component container-md">
        <h5 className="mt-3 mb-3">Choose Vehicle Type</h5>
        {orderButton}
      </div>
    </div>
  );
};

export default connect(mapStateToProps)(ClientPage);

