import PropTypes from 'prop-types';
import React, {useContext} from 'react';

import './ForecastCard.css';

import ForecastContext from '../../contexts/forecast/ForecastContext';

import ForecastChart from './ForecastChart';

const ForecastCard = ({index, item}) => {
  const {
    state: {chartData, sunrise, sunset}
  } = useContext(ForecastContext);

  if (chartData.length === 0) return null;

  return (
    <>
      <div className='container'>
        <div className='summary'>
          <span className='temperature'>
            {Math.floor(item.temperature)}&deg;C
          </span>
          <img
            alt='Icon'
            className='icon'
            src={`/icons/${item.icon.slice(0, 2)}d.png`}
          />
        </div>
        <ForecastChart chartData={chartData[index]} />
        <div className='extras'>
          <div className='pressure'>
            <span className='title'>Pressure</span>
            <span className='value'>{item.pressure} hPa</span>
          </div>
          <div className='humidity'>
            <span className='title'>Humidity</span>
            <span className='value'>{item.humidity} %</span>
          </div>
        </div>
        <div className='sun-times'>
          <div className='sunrise'>
            <span className='title'>Sunrise</span>
            <span className='value'>
              {sunrise.toLocaleTimeString()[0]}:{sunrise.getMinutes()}am
            </span>
          </div>
          <div className='sunset'>
            <span className='title'>Sunset</span>
            <span className='value'>
              {sunset.toLocaleTimeString()[0]}:{sunset.getMinutes()}pm
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

ForecastCard.propTypes = {
  index: PropTypes.number.isRequired,
  item: PropTypes.object.isRequired
};

export default ForecastCard;
