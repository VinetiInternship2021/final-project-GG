import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { mapStateToProps } from '../../redux/actions';
import SettingsHelper from '../../helpers/SettingsHelper';
import { appRoutes, DriverPageButtons } from '../../utils/configs';
import MenuHelper from '../../helpers/MenuHelper';
import { PageButton } from '../Buttons';

const DriverSettings = ({ match }) => {
  const history = useHistory();

  const onSelect = (event) => {
    const user = appRoutes.driver;
    const userId = match.params.id;
    const path = MenuHelper({ event, userId, user });
    history.push(path);
  };

  const buttons = DriverPageButtons.map((item) => (
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
      <div className="ui-component container-md">
        <div className="card text-center position-absolute top-50 start-50 translate-middle">
          <SettingsHelper modelName="drivers" reqKey="driver" />
        </div>
      </div>
    </div>
  );
};

DriverSettings.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
  // appState: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default connect(mapStateToProps)(DriverSettings);
