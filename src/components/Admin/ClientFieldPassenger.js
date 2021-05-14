import React from 'react';
import PropTypes from 'prop-types';

const ClientFieldPassenger = ({
  passenger: {
    id, phoneNumber, firstName, lastName,
  },
}) => (
  <div key={id} className="list-group-item list-group-item-action ">
    <div className="d-flex w-100 justify-content-between">
      <h5 className="mb-1">
        { `${firstName} ${lastName}` }
      </h5>
      <small> </small>
    </div>
    <p className="mb-1">
      { `Phone number ${phoneNumber}`}
    </p>
  </div>
);

ClientFieldPassenger.propTypes = {
  passenger: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default ClientFieldPassenger;
