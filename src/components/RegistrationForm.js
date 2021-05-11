import React from 'react';
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
        Phone
        <br />
        <input
          onChange={
            (e) => onChange(e)
          }
          id="phone_number"
          type="number"
          className="form-control"
          defaultValue={fields.phone_number}
        />
      </label>
      <label htmlFor="first_name" className="form-label">
        First name
        <br />
        <input
          onChange={
            (e) => onChange(e)
          }
          id="first_name"
          type="text"
          className="form-control"
          defaultValue={fields.first_name}
        />
      </label>
      <label htmlFor="last_name" className="form-label">
        Last name
        <br />
        <input
          onChange={
            (e) => onChange(e)
          }
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
          onChange={
            (e) => onChange(e)
          }
          id="email"
          type="text"
          className="form-control"
          defaultValue={fields.email}
        />
      </label>
      { !settings
        ? (
          <div>
            <label htmlFor="password" className="form-label">
              Password
              <br />
              <input
                onChange={
              (e) => onChange(e)
            }
                id="password"
                type="password"
                className="form-control"
              />
            </label>
            <label htmlFor="password_confirmation" className="form-label">
              Confirm Password
              <br />
              <input
                onChange={
              (e) => onChange(e)
            }
                id="password_confirmation"
                type="password"
                className="form-control"
              />
            </label>
          </div>
        )
        : <></>}
      { children }
    </div>
  );
};
RegistrationForm.defaultProps = {
  children: <></>,
  settings: false,
};

RegistrationForm.propTypes = {
  data: PropTypes.arrayOf(PropTypes.any).isRequired,
  header: PropTypes.string.isRequired,
  children: PropTypes.element,
  settings: PropTypes.bool,
};

export default RegistrationForm;
