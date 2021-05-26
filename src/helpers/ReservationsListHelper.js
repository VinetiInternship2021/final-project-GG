import React from 'react';

const ReservationsListHelper = ({ state }) => state.user.reservations.map(({
  id, price, status, rating,
}) => {
  let completed = 'bg-danger';
  let rate = 'bg-danger';
  if (status === 'completed') {
    completed = 'bg-success';
    if (rating > 3) {
      rate = 'bg-success';
    }
  }
  return (
    <div key={id} className="list-group-item list-group-item-action">
      <div className="d-flex w-100 justify-content-between">
        <h5 className="mb-1">
          { `Price ${price}` }
        </h5>
        <span className={`badge ${completed}`}>
          {status === 'completed' ? 'Completed' : 'Canceled'}
        </span>
        <span className={`badge ${rate}`}>
          {`Passenger rate - ${rating}`}
        </span>
      </div>
    </div>
  );
});

export default ReservationsListHelper;
