import React from 'react'

const ProfileInfoTable = (props) => {
  const fields = Object.entries(props.fieldsData).map((key,index) => {
    return (
      <thead key={index}>
        <tr>
          <th>{ key[0] }</th>
          <th>{typeof key[1] === 'boolean' ? key[1].toString() : key[1]}</th>
        </tr>
      </thead>
    )
  })
  return fields
}
export default ProfileInfoTable;