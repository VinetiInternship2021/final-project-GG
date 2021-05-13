import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import Loading from '../../shared/Animations/Loading';
import GetUsers from '../../helpers/GetUsersListHelper';
import { mapStateToProps } from '../../redux/actions';
import ClientField from './ClientField';
import { AdminPageButtons } from '../../utils/configs';
import { PageButton } from '../Buttons';
import MenuHelper from '../../helpers/MenuHelper';

const ClientList = ({ appState, dispatch, match }) => {
  const { client } = match.params;
  const history = useHistory();
  const { userId } = appState;

  const onSelect = (event) => {
    const path = MenuHelper({ event, userId });
    history.push(path);
  };

  useEffect(() => {
    GetUsers({ client, dispatch })
  }, [client]);

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
        <div className="card text-center position-absolute top-50 start-50 translate-middle">
          {appState.isLoading ? <Loading /> : false}
          <ClientField client={client} />
        </div>
      </div>
    </div>
  );
};

ClientList.propTypes = {
  appState: PropTypes.objectOf(PropTypes.any).isRequired,
  dispatch: PropTypes.func.isRequired,
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default connect(mapStateToProps)(ClientList);
