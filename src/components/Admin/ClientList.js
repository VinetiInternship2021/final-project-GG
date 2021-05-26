import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Loading from '../../shared/Animations/Loading';
import GetUsers from '../../helpers/GetUsersListHelper';
import { mapStateToProps } from '../../redux/actions';
import ClientField from './ClientField';
import { AdminPageButtons, appRoutes } from '../../utils/configs';
import UserMenu from '../layouts/UserMenu';

const ClientList = ({ appState, dispatch, match }) => {
  const { client } = match.params;
  const { userId } = appState;
  const [state, setState] = useState(false);

  useEffect(() => {
    GetUsers({ client, dispatch });
  }, [client, state]);

  return (
    <div>
      {userId
        && (
          <UserMenu
            routes={appRoutes.admin}
            userId={userId}
            menuButtons={AdminPageButtons}
          />
        )}
      <div className="ui-component container-md">
        <div className="card text-center top-50 start-50 translate-middle">
          {appState.isLoading ? <Loading /> : false}
          <ClientField client={client} setState={setState} />
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
