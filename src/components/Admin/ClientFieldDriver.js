/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import VerifyButton from './verification/VerifyButton';

const ClientFieldDriver = ({
  driver: {
    id, phoneNumber, firstName, lastName, isActive, isVerifiedByAdmin,
  },
  onClick,
  filter,
}) => {
  const verifiedClassName = isVerifiedByAdmin ? 'bg-success' : 'bg-danger';
  const activeClassName = isActive && isVerifiedByAdmin ? 'bg-success' : 'bg-danger';

  return (
    <div key={id} className="list-group-item list-group-item-action">
      <div className="d-flex w-100 justify-content-between">
        <h5 className="mb-1">
          { `${firstName} ${lastName}` }
        </h5>
        <span className={`badge ${verifiedClassName}`}>
          {isVerifiedByAdmin ? 'Confirmed' : 'Unconfirmed'}
        </span>
      </div>
      <p className="mb-1">
        { `Phone number ${phoneNumber}`}
      </p>
      <small className={`badge ${activeClassName}`}>
        {isActive ? 'Active' : 'Inactive'}
      </small>
      {(!isVerifiedByAdmin && !filter) ? (
        <VerifyButton
          onClick={onClick}
          text="Verify"
        />
      ) : ''}
    </div>
  );
};

ClientFieldDriver.propTypes = {
  driver: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default ClientFieldDriver;
