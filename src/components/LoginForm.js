import React from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import PropTypes from 'prop-types';
import ErrorMessages from './layouts/ErrorMessages';

const LoginForm = ({
  fields, setFields, onClick, header,
}) => (
  <form className="text-center w-25 border position-absolute top-50 start-50 translate-middle">
    <div className="me-3 mx-3">
      <br />
      <h5>{header}</h5>
      <label htmlFor="phone" className="form-label">
        Phone
        <br />
        {/* <input */}
        <PhoneInput
          country="am"
          id="phone"
          value={fields.phone_number}
          onChange={(e) => setFields({ ...fields, phone_number: e })}
          className="form-control"
        />
      </label>
      <label htmlFor="password" className="form-label">
        Password
        <br />
        <input
          onClick={() => setFields({ ...fields, alert: [] })}
          onChange={(e) => setFields({ ...fields, password: e.target.value })}
          id="password"
          type="password"
          className="form-control"
        />
      </label>
      <label htmlFor="rememberMe" className="form-label">
        <input
          className="form-check-input"
          name="rememberMe"
          type="checkbox"
          checked={fields.remember_me}
          onChange={(event) => setFields({
            ...fields,
            remember_me: event.target.checked,
          })}
        />
        Remember
      </label>
      <ErrorMessages fields={fields} />
    </div>
    <button
      onClick={(e) => onClick(e)}
      type="submit"
      className="btn btn-outline-success mx-3 mb-3"
    >
      Submit
    </button>
  </form>
);

LoginForm.propTypes = {
  fields: PropTypes.objectOf(PropTypes.any).isRequired,
  onClick: PropTypes.func.isRequired,
  header: PropTypes.string.isRequired,
  setFields: PropTypes.func.isRequired,
};

export default LoginForm;
