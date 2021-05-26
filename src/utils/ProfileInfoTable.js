import React from 'react';
import PropTypes from 'prop-types';

const ProfileInfoTable = ({ fieldsData }) => {
  const fields = Object.entries(fieldsData).map(([key, value]) => (
    (key !== 'driver_license_image_id' && key !== 'reservations')
    && (
      <tr key={key}>
        <th>{ key }</th>
        <th>{typeof value === 'boolean' ? value.toString() : value}</th>
      </tr>
    )
  ));

  return (
    <table className="table table-borderless">
      <tbody>
        {fields}
      </tbody>
    </table>
  );
};

ProfileInfoTable.defaultProps = {
  fieldsData: { field: 'Null' },
};

ProfileInfoTable.propTypes = {
  fieldsData: PropTypes.objectOf(PropTypes.any),
};

export default ProfileInfoTable;
