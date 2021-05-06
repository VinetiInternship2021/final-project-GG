import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { mapStateToProps } from '../../redux/actions';
import { loginParams } from '../../utils/configs';
import LoginOnClick from '../../utils/LoginOnClick';
import LoginForm from '../LoginForm';

const DriverLogin = (props) => {
  const history = useHistory();
  const { appState, dispatch } = props;
  const state = appState;
  const [fields, setFields] = useState({
    ...loginParams,
    model_name: 'Driver',
  });

  useEffect(() => {
    if (state.loggedIn) {
      history.push(`/${state.userType}/${state.userId}`);
    }
  }, []);

  return (
    <div>
      <LoginForm
        fields={fields}
        header="Driver Login"
        setFields={setFields}
        onClick={(event) => LoginOnClick(event, fields, setFields, state, dispatch, history)}
      />
    </div>
  );
};

DriverLogin.propTypes = {
  appState: PropTypes.element.isRequired,
  dispatch: PropTypes.element.isRequired,
};

export default connect(mapStateToProps)(DriverLogin);
