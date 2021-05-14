import React from 'react';
import PropTypes from 'prop-types';

const ErrorMessages = ({ fields }) => (
  <div>
    { fields.alert.length
      && (
        <div id="error_explanation">
          <div className="alert alert-danger">
            In form founds
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
      )}
  </div>
);

ErrorMessages.propTypes = {
  fields: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default ErrorMessages;
