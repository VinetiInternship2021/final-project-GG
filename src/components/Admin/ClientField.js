import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { mapStateToProps } from '../../redux/actions';

const ClientField = ({ usersList, client }) => {
  let fields;
  switch (client) {
    case 'passengers':
      try {
        fields = usersList.users.map(({ passenger }) => {
          const {
            id, phoneNumber, firstName, lastName,
          } = passenger;
          return (
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
        });
      } catch (err) {
        console.log(err);
      }
      break;
    case 'drivers':
      try {
        fields = usersList.users.map(({ driver }) => {
          const {
            id, phoneNumber, firstName, lastName, isActive, isVerifiedByAdmin,
          } = driver;
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
              <div className="d-flex w-100 justify-content-between align-items-center">
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
            </div>
          );
        });
      } catch (err) {
        console.log(err);
      }
      break;
    default:
      fields = [false].map(() => (
        <div key={0} className="list-group-item list-group-item-action ">
          <div className="d-flex w-100 justify-content-between">
            <h5 className="mb-1">
              No people
            </h5>
          </div>
        </div>
      ));
  }

  return (
    <div className="list-group">
      {fields}
    </div>
  );
};

ClientField.propTypes = {
  usersList: PropTypes.objectOf(PropTypes.any).isRequired,
  client: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(ClientField);
