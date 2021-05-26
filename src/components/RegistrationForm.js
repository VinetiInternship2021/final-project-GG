import React from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import PropTypes from 'prop-types';

const RegistrationForm = ({
  data, header, children, settings,
}) => {
  const [fields, setFields] = data;

  const onChange = (event) => {
    const params = {
      ...fields,
      alert: '',
    };
    params[event.target.id] = event.target.value;
    setFields(params);
  };

  return (
    <div>
      <br />
      <h5>{header}</h5>
      <label htmlFor="phone_number" className="form-label">
        Phone (Required)
        <br />
        <PhoneInput
          country="am"
          id="phone_number"
          value={fields.phone_number}
          defaultValue={fields.phone_number}
          onChange={(e) => {
            const params = {
              ...fields,
              alert: '',
            };
            params.phone_number = e;
            setFields(params);
          }}
          inputClass="form-control"
        />
        {/* <input */}
      </label>
      <label htmlFor="first_name" className="form-label">
        First name (Required)
        <br />
        <input
          onChange={(e) => onChange(e)}
          id="first_name"
          type="text"
          className="form-control"
          defaultValue={fields.first_name}
        />
      </label>
      <label htmlFor="last_name" className="form-label">
        Last name (Required)
        <br />
        <input
          onChange={(e) => onChange(e)}
          id="last_name"
          type="text"
          className="form-control"
          defaultValue={fields.last_name}
        />
      </label>
      <label htmlFor="email" className="form-label">
        Email
        <br />
        <input
          onChange={(e) => onChange(e)}
          id="email"
          type="text"
          className="form-control"
          defaultValue={fields.email}
        />
      </label>
      { !settings
        && (
          <div>
            <label htmlFor="password" className="form-label">
              Password (Required)
              <br />
              <input
                onChange={(e) => onChange(e)}
                id="password"
                type="password"
                className="form-control"
              />
            </label>
            <label htmlFor="password_confirmation" className="form-label">
              Confirm Password (Required)
              <br />
              <input
                onChange={(e) => onChange(e)}
                id="password_confirmation"
                type="password"
                className="form-control"
              />
            </label>
          </div>
        )}
      { children }
    </div>
  );
};

RegistrationForm.defaultProps = {
  children: [null],
  settings: false,
};

RegistrationForm.propTypes = {
  data: PropTypes.arrayOf(PropTypes.any).isRequired,
  header: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.element), PropTypes.bool]),
  settings: PropTypes.bool,
};

export default RegistrationForm;
