import React from 'react';
import PropTypes from 'prop-types';
import { Line } from 'react-chartjs-2';

const DriverReservChart = ({ reservations }) => {
  const data = {};
  reservations.forEach((reservation) => {
    const date = reservation.updated_at.slice(0, 10);
    if (data[date] !== undefined) {
      data[date] += 1;
    } else data[date] = 1;
  });
  const chartData = [];
  Object.entries(data).forEach((element) => {
    chartData.push({ x: element[0], y: element[1] });
  });

  const chartsDataset = {
    datasets: [
      {
        label: 'Dataset 1',
        data: chartData,
        fill: true,
        backgroundColor: '#198754',
      },
    ],
  };

  const config = {
    options: {
      plugins: {
        filler: {
          propagate: false,
        },
        title: {
          display: true,
          text: (ctx) => `drawTime: ${ctx.chart.options.plugins.filler.drawTime}`,
        },
      },
      pointBackgroundColor: '#fff',
      radius: 10,
      interaction: {
        intersect: false,
      },
    },
  };

  return (
    <div>
      <Line type="line" data={chartsDataset} height="50" config={config} />
    </div>
  );
};

DriverReservChart.defaultProps = {
  reservations: [null],
};

DriverReservChart.propTypes = {
  reservations: PropTypes.arrayOf(PropTypes.any),
};

export default DriverReservChart;
