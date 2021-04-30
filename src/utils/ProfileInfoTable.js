import React from 'react'

const ProfileInfoTable = ({fieldsData}) => {
  const fields = Object.entries(fieldsData).map((key,index) => (
      <thead key={index}>
        <tr>
          <th>{ key[0] }</th>
          <th>{typeof key[1] === 'boolean' ? key[1].toString() : key[1]}</th>
        </tr>
      </thead>
  ))
  return fields
}
export default ProfileInfoTable;