import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import ProfileInfoTable from '../../utils/ProfileInfoTable';
import Loading from '../../shared/Animations/Loading';
import getUserData from '../../helpers/ProfilePageHelper';
import { AdminPageButtons } from '../../utils/configs';
import { PageButton } from '../Buttons';
import MenuHelper from '../../helpers/MenuHelper';
import { mapStateToProps } from '../../redux/actions';

const AdminProfile = ({ match, appState }) => {
  const history = useHistory();
  const { userId } = appState;
  const [state, setState] = useState({
    userId: match.params.id,
    isActive: false,
    userType: 'SuperUser',
    isLoading: true,
    apiUrl: '',
    user: {},
  });

  useEffect(() => {
    const modelName = 'super_users';
    getUserData({ state, setState, modelName })
      .then();
  }, []);

  const onSelect = (event) => {
    const path = MenuHelper({ event, userId });
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
          {state.isLoading ? <Loading /> : false}
          <ProfileInfoTable fieldsData={state.user} />
        </div>
      </div>
    </div>
  );
};

AdminProfile.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
  appState: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default connect(mapStateToProps)(AdminProfile);
