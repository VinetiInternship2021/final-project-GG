import React from 'react';
import PropTypes from 'prop-types';

const LoginForm = (props) => {
  const { fields } = props;
  const { setFields } = props;
  const { onClick } = props;
  const { header } = props;

  return (
    <form className="text-center w-25 border position-absolute top-50 start-50 translate-middle">
      <div className="me-3 mx-3">
        <br />
        <h5>{header}</h5>
        <label htmlFor="phone" className="form-label">
          Phone
          <br />
          <input
            onClick={() => {
              setFields({ ...fields, alert: '' });
            }}
            onChange={(e) => {
              setFields({ ...fields, phone_number: e.target.value });
            }}
            id="phone"
            type="number"
            className="form-control"
          />
        </label>

        <label htmlFor="password" className="form-label">
          Password
          <br />
          <input
            onClick={() => {
              setFields({ ...fields, alert: '' });
            }}
            onChange={(e) => {
              setFields({ ...fields, password: e.target.value });
            }}
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
        <p>{fields.alert}</p>
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
};

LoginForm.propTypes = {
  fields: PropTypes.element.isRequired,
  onClick: PropTypes.element.isRequired,
  header: PropTypes.element.isRequired,
  setFields: PropTypes.element.isRequired,
};

export default LoginForm;
