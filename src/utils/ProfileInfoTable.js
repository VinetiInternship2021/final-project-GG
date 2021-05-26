import React from 'react';

const ProfileInfoTable = ({ fieldsData }) => {
  const fields = Object.entries(fieldsData).map(([key, value]) => (
    (key !== 'driver_license_image_id' && key !== 'reservations')
    && (
    <table key={key} className="table table-borderless">
      <thead>
        <tr>
          <th>{ key }</th>
          <th>{typeof value === 'boolean' ? value.toString() : value}</th>
        </tr>
      </thead>
    </table>
    )
  ));

  return fields;
};

export default ProfileInfoTable;
