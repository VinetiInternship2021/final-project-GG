import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { mapStateToProps } from '../../redux/actions';
import { loginParams } from '../../utils/configs';
import LoginHelper from '../../helpers/LoginHelper';
import LoginForm from '../LoginForm';

const AdminLogin = ({ appState, dispatch }) => {
  const history = useHistory();
  const state = appState;
  const [fields, setFields] = useState({
    ...loginParams,
    model_name: 'SuperUser',
  });

  const onClick = (event, Fields, SetFields, State, Dispatch, History) => {
    event.preventDefault();
    LoginHelper(Fields, SetFields, State, Dispatch, History);
  };

  useEffect(() => {
    if (state.loggedIn) {
      history.push(`/${state.userType}/${state.userId}`);
    }
  }, []);

  return (
    <>
      <LoginForm
        fields={fields}
        header="Admin login"
        setFields={setFields}
        onClick={(event) => onClick(event, fields, setFields, state, dispatch, history)}
      />
    </>
  );
};

AdminLogin.propTypes = {
  appState: PropTypes.objectOf(PropTypes.any).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(AdminLogin);
