import React from 'react';

const ProfileSettingsFields = ({ fieldsData }) => {
  const fields = Object.entries(fieldsData).map((key) => (
    <table key={key[0]} className="table table-borderless">
      <thead>
        <tr>
          <th>{ key[0] }</th>
          <th>{typeof key[1] === 'boolean' ? key[1].toString() : key[1]}</th>
        </tr>
      </thead>
    </table>
  ));
  return fields;
};

export default ProfileSettingsFields;
