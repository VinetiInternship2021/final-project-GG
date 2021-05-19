import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { mapStateToProps } from '../../redux/actions';
import ClientFieldDriver from './ClientFieldDriver';
import ClientFieldPassenger from './ClientFieldPassenger';
import ClientFieldDefault from './ClientFieldDefault';
import Filter from './verification/Filter';
import UnverifiedDriverList from './verification/UnverifiedDriverList';

const ClientField = ({ usersList, client, dispatch }) => {
  const [filter, setFilter] = useState({
    unverified: false,
  });

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
      {client === 'drivers' ? <Filter filter={filter} setFilter={setFilter} /> : ''}
      {filter.unverified ? <UnverifiedDriverList /> : fields}
    </div>
  );
};

ClientField.propTypes = {
  usersList: PropTypes.objectOf(PropTypes.any).isRequired,
  client: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(ClientField);
