import PropTypes from 'prop-types';
import React from 'react';
import {Line} from 'react-chartjs-2';

const ForecastChart = ({chartData}) => {
  const temperatures = chartData.datasets[0].data;

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
          gridLines: {display: false},
          ticks: {
            display: false,
            max: Math.max(...temperatures) + 10,
            min: Math.min(...temperatures) - 10
          }
        }
      ]
    }
  };

  return <Line data={chartData} options={options} />;
};

ForecastChart.propTypes = {
  chartData: PropTypes.object.isRequired
};

export default ForecastChart;
