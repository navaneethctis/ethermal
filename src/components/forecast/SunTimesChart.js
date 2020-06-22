import React from 'react';
import {Line} from 'react-chartjs-2';

const SunTimesChart = () => {
  const data = {
    labels: ['6am', '1pm', '8pm'],
    datasets: [
      {
        backgroundColor: '#fff',
        borderColor: '#888',
        borderJoinStyle: 'square',
        borderWidth: 1,
        data: [-10, 20, -10],
        fill: false,
        pointRadius: 0
      }
    ]
  };

  const options = {
    legend: {display: false},
    scales: {
      xAxes: [
        {
          gridLines: {drawBorder: false},
          ticks: {fontFamily: "'Montserrat', sans-serif", fontSize: 13}
        }
      ],
      yAxes: [
        {
          gridLines: {lineWidth: 0, tickMarkLength: 0, zeroLineWidth: 1},
          ticks: {
            display: false,
            max: 30,
            min: -20
          }
        }
      ]
    }
  };

  return <Line data={data} options={options} />;
};

export default SunTimesChart;
