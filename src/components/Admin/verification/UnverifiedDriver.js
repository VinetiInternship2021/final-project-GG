import React from 'react';

export default function UnverifiedDriver({ driver }) {
  const { id, first_name, last_name } = driver;
  return (
    <div>
      <h2>ID: {id}</h2>
      <h2>First name: {first_name}</h2>
      <h2>Last name: {last_name}</h2>
    </div>
  );
}
