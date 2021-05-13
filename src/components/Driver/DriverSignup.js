import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { signParams } from '../../utils/configs';
import RegistrationForm from '../RegistrationForm';
import { mapStateToProps } from '../../redux/actions';
import SignUpHelper from '../../helpers/SignUpHelper';
import ErrorMessages from '../layouts/ErrorMessages';

const DriverSignup = ({ appState, dispatch }) => {
  const history = useHistory();
  const state = appState;
  const [fields, setFields] = useState({
    ...signParams,
  });
  const params = {
    driver: {
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
    <div>
      <form className="text-center w-50 border position-absolute top-50 start-50 translate-middle">

        <div className="me-3 mx-3">
          <RegistrationForm onChange={onChange} data={[fields, setFields]} header="Client registration">
            <label htmlFor="car_manufacturer" className="form-label">
              Car manufacturer
              <br />
              <input
                onChange={
                  (e) => onChange(e)
                }
                id="car_manufacturer"
                type="text"
                className="form-control"
              />
            </label>
            <label htmlFor="car_model" className="form-label">
              Car model
              <br />
              <input
                onChange={
                  (e) => onChange(e)
                }
                id="car_model"
                type="text"
                className="form-control"
              />
            </label>
            <label htmlFor="email" className="form-label">
              Email
              <br />
              <input
                onChange={
                  (e) => onChange(e)
                }
                id="email"
                type="text"
                className="form-control"
              />
            </label>
            <label htmlFor="car_registration_number" className="form-label">
              Car registration number
              <br />
              <input
                onChange={
                  (e) => onChange(e)
                }
                id="car_registration_number"
                type="text"
                className="form-control"
              />
            </label>
          </RegistrationForm>
        </div>

        {fields.alert
          ? (
            <ErrorMessages fields={fields} />
          )
          : false}

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
    </div>
  );
};

DriverSignup.propTypes = {
  appState: PropTypes.objectOf(PropTypes.any).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(DriverSignup);
