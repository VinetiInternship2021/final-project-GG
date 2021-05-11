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
            // eslint-disable-next-line camelcase
            id, phone_number, first_name, last_name,
          } = passenger;
          return (
            <div key={id} className="list-group-item list-group-item-action ">
              <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-1">
                  {/* eslint-disable-next-line camelcase */}
                  { `${first_name} ${last_name}` }
                </h5>
                <small> </small>
              </div>
              <p className="mb-1">
                {/* eslint-disable-next-line camelcase */}
                { `Phone number ${phone_number}`}
              </p>
            </div>
          );
        });
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err);
      }
      break;
    case 'drivers':
      try {
        fields = usersList.users.map(({ driver }) => {
          const {
            // eslint-disable-next-line camelcase
            id, phone_number, first_name, last_name, is_active, is_verified_by_admin,
          } = driver;
          let verified;
          let active;
          // eslint-disable-next-line camelcase,no-unused-expressions
          is_verified_by_admin ? verified = 'bg-success' : verified = 'bg-danger';
          // eslint-disable-next-line camelcase,no-unused-expressions
          is_active ? active = 'bg-success' : active = 'bg-danger';
          return (
            <div key={id} className="list-group-item list-group-item-action">
              <div className="d-flex w-100 justify-content-between align-items-center">
                <h5 className="mb-1">
                  {/* eslint-disable-next-line camelcase */}
                  { `${first_name} ${last_name}` }
                </h5>
                <span className={`badge ${verified}`}>
                  {/* eslint-disable-next-line camelcase */}
                  {is_verified_by_admin ? 'Confirmed' : 'Unconfirmed'}
                </span>
              </div>
              <p className="mb-1">
                {/* eslint-disable-next-line camelcase */}
                { `Phone number ${phone_number}`}
              </p>
              <small className={`badge ${active}`}>
                {/* eslint-disable-next-line camelcase */}
                {is_active ? 'Active' : 'Inactive'}
              </small>
            </div>
          );
        });
      } catch (err) {
        // eslint-disable-next-line no-console
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
