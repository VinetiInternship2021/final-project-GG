import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { mapStateToProps } from '../../redux/actions';
import ClientFieldDriver from './ClientFieldDriver';
import ClientFieldPassenger from './ClientFieldPassenger';
import ClientFieldDefault from './ClientFieldDefault';

const ClientField = ({ usersList, client, setState }) => {
  let fields;
  switch (client) {
    case 'passengers':
      try {
        fields = usersList.users.map(({ passenger }) => (
          <ClientFieldPassenger key={passenger.id} passenger={passenger} />
        ));
      } catch (err) {
        console.log(err);
      }
      break;
    case 'drivers':
      try {
        fields = usersList.users.map(({ driver }) => (
          <ClientFieldDriver
            setState={setState}
            key={driver.id}
            driver={driver}
          />
        ));
      } catch (err) {
        console.log(err);
      }
      break;
    default:
      fields = [false].map(() => <ClientFieldDefault />);
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
  setState: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(ClientField);
