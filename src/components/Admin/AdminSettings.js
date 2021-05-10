import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { mapStateToProps } from '../../redux/actions';
import MenuHelper from '../../helpers/MenuHelper';
import { AdminPageButtons, appRoutes } from '../../utils/configs';
import { PageButton } from '../Buttons';
import SettingsHelper from '../../helpers/SettingsHelper';

const AdminSettings = ({ appState }) => {
  const { userId } = appState;
  const history = useHistory();

  const onSelect = (event) => {
    const user = appRoutes.admin;
    const path = MenuHelper({ event, userId, user });
    history.push(path);
  };

  const buttons = AdminPageButtons.map((button) => (
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
        <div className="card text-center position-absolute top-50 start-50 translate-middle">
          <SettingsHelper modelName="super_users" reqKey="super_user" />
        </div>
      </div>
    </div>
  );
};

AdminSettings.propTypes = {
  // match: PropTypes.objectOf(PropTypes.any).isRequired,
  appState: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default connect(mapStateToProps)(AdminSettings);
