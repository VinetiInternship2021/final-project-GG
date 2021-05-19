import React from 'react';

export default function Filter({ setFilter, filter }) {
  const handleClick = () => {
    setFilter({
      unverified: !filter.unverified,
    });
  };

  return (
    <button type="submit" onClick={handleClick}>Unverified</button>
  );
}
