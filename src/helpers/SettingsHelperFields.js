import React from 'react';
import PropTypes from 'prop-types';
import Loading from '../shared/Animations/Loading';
import RegistrationForm from '../components/RegistrationForm';

const SettingsHelperFields = ({
  fields, driver, setFields, onChange, state,
}) => (
  <div className="me-3 mx-3">
    {state.isLoading && <Loading />}
    Settings
    {state.userId
      && (
      <RegistrationForm
        key={fields.phone_number}
        settings
        onChange={onChange}
        data={[fields, setFields]}
        header={`${fields.first_name} information updating`}
      >
        {driver
        && (
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
            <label htmlFor="car_level" className="form-label">
              Car level
              <br />
              <input
                onChange={(e) => onChange(e)}
                id="car_level"
                type="text"
                className="form-control"
                defaultValue={fields.car_level}
              />
            </label>
            <label htmlFor="driver_license_image_id" className="form-label">
              Car license image
              <br />
              <input
                onChange={(e) => onChange(e)}
                id="driver_license_image_id"
                type="file"
                className="form-control"
                accept="image/*"
              />
            </label>
          </div>
        )}
      </RegistrationForm>
      )}
  </div>
);

SettingsHelperFields.defaultProps = {
  driver: false,
};

SettingsHelperFields.propTypes = {
  state: PropTypes.objectOf(PropTypes.any).isRequired,
  fields: PropTypes.objectOf(PropTypes.any).isRequired,
  driver: PropTypes.bool,
  setFields: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default SettingsHelperFields;
