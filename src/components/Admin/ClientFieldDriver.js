import React from 'react';
import PropTypes from 'prop-types';
import DriverReservChart from '../../shared/reservationCharts/DriverReservChart';
import VerifyButton from './verification/VerifyButton';
import VerifyHelper from '../../helpers/VerifyHelper';

const ClientFieldDriver = ({
  driver: {
    id, phoneNumber, firstName,
    lastName, isActive, isVerifiedByAdmin,
    driverLicenseImageId, reservations,
  },
  setState,
}) => {
  const verified = isVerifiedByAdmin ? 'bg-success' : 'bg-danger';
  const active = isActive && isVerifiedByAdmin ? 'bg-success' : 'bg-danger';

  const onClick = () => {
    VerifyHelper({ id, setState });
  };

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
      {!isVerifiedByAdmin
        && (
        <VerifyButton
          onClick={onClick}
          text="Verify"
        />
        )}
      {driverLicenseImageId && <img className="drivers-list-licence" alt="licence" src={driverLicenseImageId} />}
      {reservations.length > 0 && <DriverReservChart reservations={reservations} />}
    </div>
  );
};

ClientFieldDriver.propTypes = {
  driver: PropTypes.objectOf(PropTypes.any).isRequired,
  setState: PropTypes.func.isRequired,
};

export default ClientFieldDriver;
