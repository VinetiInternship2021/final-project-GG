import React from 'react';
import PropTypes from 'prop-types';
import Loading from '../shared/Animations/Loading';
import RegistrationForm from '../components/RegistrationForm';

const SettingsHelperFields = ({
  fields, driver, setFields, onChange, state,
}) => (
  <div className="me-3 mx-3">
    {state.isLoading ? <Loading /> : false}
    Settings
    <RegistrationForm
      key={fields.phone_number}
      settings
      onChange={onChange}
      data={[fields, setFields]}
      header={`${fields.first_name} information updating`}
    >
      {driver
        ? (
          <div>
            <label htmlFor="car_manufacturer" className="form-label">
              Car manufacturer
              <br />
              <input
                onChange={(e) => onChange(e)}
                id="car_manufacturer"
                type="text"
                className="form-control"
                defaultValue={fields.car_manufacturer}
              />
            </label>
            <label htmlFor="car_model" className="form-label">
              Car model
              <br />
              <input
                onChange={(e) => onChange(e)}
                id="car_model"
                type="text"
                className="form-control"
                defaultValue={fields.car_model}
              />
            </label>
            <label htmlFor="car_registration_number" className="form-label">
              Car registration number
              <br />
              <input
                onChange={(e) => onChange(e)}
                id="car_registration_number"
                type="text"
                className="form-control"
                defaultValue={fields.car_registration_number}
              />
            </label>
          </div>
        ) : <></>}
    </RegistrationForm>
  </div>
);

SettingsHelperFields.defaultProps = {
  driver: false,
};

SettingsHelperFields.propTypes = {
  // match: PropTypes.objectOf(PropTypes.any).isRequired,
  state: PropTypes.objectOf(PropTypes.any).isRequired,
  fields: PropTypes.objectOf(PropTypes.any).isRequired,
  driver: PropTypes.bool,
  setFields: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default SettingsHelperFields;
