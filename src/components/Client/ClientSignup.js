import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { signParams } from '../../utils/configs';
import RegistrationForm from '../RegistrationForm';
import { mapStateToProps } from '../../redux/actions';
import SignUpHelper from '../../helpers/SignUpHelper';
import ErrorMessages from '../layouts/ErrorMessages';

const ClientSignup = (props) => {
  const history = useHistory();
  const { appState, dispatch } = props;
  const state = appState;
  const [fields, setFields] = useState({
    ...signParams,
  });
  const params = {
    passenger: {
      ...fields,
    },
  };

  const onChange = (event) => {
    const parameter = {
      ...fields,
      alert: '',
    };
    parameter[event.target.id] = event.target.value;
    setFields(parameter);
  };

  const onClick = (event, Fields, SetFields, State, Dispatch, History, Params) => {
    event.preventDefault();
    SignUpHelper(Fields, SetFields, State, Dispatch, History, Params);
  };

  return (
    <>
      <form className="text-center w-25 border position-absolute top-50 start-50 translate-middle">
        {fields.alert
          && (
            <ErrorMessages fields={fields} />
          )}
        <div className="me-3 mx-3">
          <RegistrationForm onChange={onChange} data={[fields, setFields]} header="Client registration" />
        </div>
        <button
          onClick={(e) => {
            onClick(e, fields, setFields, state, dispatch, history, params);
          }}
          type="submit"
          className="btn btn-outline-success mx-3 mb-3"
        >
          Submit
        </button>
      </form>
    </>
  );
};

ClientSignup.propTypes = {
  appState: PropTypes.objectOf(PropTypes.any).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(ClientSignup);
