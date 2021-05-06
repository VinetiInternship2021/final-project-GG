import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { signParams } from '../../utils/configs';
import RegistrationForm from '../RegistrationForm';
import { mapStateToProps } from '../../redux/actions';
import onClickBtn from '../../utils/SignupOnClick';

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

  return (
    <>
      <form className="text-center w-25 border position-absolute top-50 start-50 translate-middle">
        {fields.alert
          ? (
            <div id="error_explanation">
              <div className="alert alert-danger">
                In form found
                {' '}
                {fields.alert.length}
                {' '}
                errors
              </div>
              {fields.alert.map((error) => (
                <ul key={error}>
                  {error}
                </ul>
              ))}
            </div>
          )
          : false}
        <div className="me-3 mx-3">
          <RegistrationForm onChange={onChange} data={[fields, setFields]} />
        </div>
        <button
          onClick={(e) => {
            onClickBtn(e, fields, setFields, state, dispatch, history, params);
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
  appState: PropTypes.element.isRequired,
  dispatch: PropTypes.element.isRequired,
};

export default connect(mapStateToProps)(ClientSignup);
