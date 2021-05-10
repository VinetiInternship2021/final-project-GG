import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { appRoutes, DriverPageButtons } from '../../utils/configs';
import { PageButton } from '../Buttons';
import MenuHelper from '../../helpers/MenuHelper';
import { mapStateToProps } from '../../redux/actions';

const DriverPage = ({ appState }) => {
  const history = useHistory();
  const { userId } = appState;

  const onSelect = (event) => {
    const user = appRoutes.driver;
    const path = MenuHelper({ event, userId, user });
    history.push(path);
  };

  const buttons = DriverPageButtons.map((button) => (
    <PageButton
      key={button[0]}
      button={button[0]}
      onSelect={onSelect}
      buttonClassName="column"
      className={button[1]}
    />
  ));

  return (

    <div>
      <div className="menu">
        <ul>
          {buttons}
        </ul>
      </div>
      <div className="ui-component container-md">
        <h1>User functionality container</h1>
      </div>
    </div>
  );
};

DriverPage.propTypes = {
  // match: PropTypes.objectOf(PropTypes.any).isRequired,
  appState: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default connect(mapStateToProps)(DriverPage);
