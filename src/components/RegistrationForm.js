import React from 'react';
import PropTypes from 'prop-types';

const RegistrationForm = ({ data, header, children }) => {
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
        />
      </label>
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
      {/* eslint-disable-next-line react/destructuring-assignment,react/prop-types */}
      { children }
    </div>
  );
};

RegistrationForm.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  header: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
};

export default RegistrationForm;
