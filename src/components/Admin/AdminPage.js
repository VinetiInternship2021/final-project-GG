import React from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { AdminPageButtons } from '../../utils/configs';
import { PageButton } from '../Buttons';
import MenuHelper from '../../helpers/MenuHelper';
import { mapStateToProps } from '../../redux/actions';

const AdminPage = ({ appState: { userId } }) => {
  const history = useHistory();

  const onSelect = (event) => {
    const path = MenuHelper({ event, userId });
    history.push(path);
  };

  const buttons = Object.keys(AdminPageButtons).map((buttonKey) => (
    <PageButton
      key={buttonKey.text}
      button={buttonKey.text}
      onSelect={onSelect}
      buttonClassName="column"
      className={buttonKey.icon}
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

AdminPage.propTypes = {
  appState: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default connect(mapStateToProps)(AdminPage);
