import React from 'react';
import PropTypes from 'prop-types';
import DriverReservChart from '../../shared/reservationCharts/DriverReservChart';

const ClientFieldDriver = ({
  driver: {
    id, phoneNumber, firstName,
    lastName, isActive, isVerifiedByAdmin,
    driverLicenseImageId, reservations,
  },
}) => {
  let verified = 'bg-danger';
  let active = 'bg-danger';
  if (isVerifiedByAdmin) {
    verified = 'bg-success';
    if (isActive) {
      active = 'bg-success';
    }
  }
  return (
    <div key={id} className="list-group-item list-group-item-action">
      <div className="d-flex w-100 justify-content-between">
        <h5 className="mb-1">
          { `${firstName} ${lastName}` }
        </h5>
        <span className={`badge ${verified}`}>
          {isVerifiedByAdmin ? 'Confirmed' : 'Unconfirmed'}
        </span>
      </div>
      <p className="mb-1">
        { `Phone number ${phoneNumber}`}
      </p>
      <small className={`badge ${active}`}>
        {isActive ? 'Active' : 'Inactive'}
      </small>
      {driverLicenseImageId && <img className="drivers-list-licence" alt="licence" src={driverLicenseImageId} />}
      {reservations.length > 0 && <DriverReservChart reservations={reservations} />}
    </div>
  );
};

ClientFieldDriver.propTypes = {
  driver: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default ClientFieldDriver;
