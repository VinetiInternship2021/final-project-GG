import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { mapStateToProps } from '../../redux/actions';
import ClientFieldDriver from './ClientFieldDriver';
import ClientFieldPassenger from './ClientFieldPassenger';
import ClientFieldDefault from './ClientFieldDefault';

const ClientField = ({ usersList, client }) => {
  let fields = [null];
  switch (client) {
    case 'passengers':
      try {
        fields = usersList.users.map(({ passenger }) => (
          <div className="list-fields">
            <ClientFieldPassenger key={passenger.id} passenger={passenger} />
          </div>
        ));
      } catch (err) {
        console.log(err);
      }
      break;
    case 'drivers':
      try {
        fields = usersList.users.map(({ driver }) => (
          <div className="list-fields">
            <ClientFieldDriver
              key={driver.id}
              driver={driver}
            />
          </div>
        ));
      } catch (err) {
        console.log(err);
      }
      break;
    default:
      fields = [false].map(() => <ClientFieldDefault />);
  }

  return (
    <div
      key="12"
      className="list-group"
    >
      {fields}
    </div>
  );
};

ClientField.propTypes = {
  usersList: PropTypes.objectOf(PropTypes.any).isRequired,
  client: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(ClientField);
