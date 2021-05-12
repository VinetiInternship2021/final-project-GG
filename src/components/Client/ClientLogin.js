import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { mapStateToProps } from '../../redux/actions';
import { loginParams } from '../../utils/configs';
import LoginForm from '../LoginForm';
import LoginHelper from '../../helpers/LoginHelper';

const ClientLogin = ({ appState, dispatch }) => {
  const history = useHistory();
  const state = appState;
  const [fields, setFields] = useState({
    ...loginParams,
    model_name: 'Passenger',
  });

  const onClick = (event, Fields, SetFields, State, Dispatch, History) => {
    event.preventDefault();
    LoginHelper(Fields, SetFields, State, Dispatch, History)
      .then();
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
        header="Passenger Login"
        setFields={setFields}
        onClick={(event) => onClick(event, fields, setFields, state, dispatch, history)}
      />
    </>
  );
};

ClientLogin.propTypes = {
  appState: PropTypes.objectOf(PropTypes.any).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(ClientLogin);
