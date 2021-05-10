import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import ProfileInfoTable from '../../utils/ProfileInfoTable';
import Loading from '../../shared/Animations/Loading';
import getUserData from '../../helpers/ProfilePageHelper';
import { DriverPageButtons, appRoutes } from '../../utils/configs';
import { PageButton } from '../Buttons';
import MenuHelper from '../../helpers/MenuHelper';

const DriverProfile = ({ match }) => {
  const history = useHistory();
  const [state, setState] = useState({
    userId: match.params.id,
    isLoading: true,
    user: {},
  });

  useEffect(() => {
    const modelName = 'drivers';
    getUserData({ state, setState, modelName })
      .then();
  }, []);

  const onSelect = (event) => {
    const user = appRoutes.driver;
    const { userId } = state;
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
        <div className="card text-center position-absolute top-50 start-50 translate-middle">
          {state.isLoading ? <Loading /> : false}
          <ProfileInfoTable fieldsData={state.user} />
        </div>
      </div>
    </div>
  );
};
DriverProfile.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default DriverProfile;
