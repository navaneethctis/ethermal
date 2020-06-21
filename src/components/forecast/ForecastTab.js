import PropTypes from 'prop-types';
import React from 'react';

import './ForecastTab.css';

const ForecastTab = ({item}) => (
  <>
    <span className='day'>{String(new Date(item.date)).slice(0, 3)}</span>
    <span className='temperature'>
      <span>{Math.floor(item.feelsLike)}&deg;</span>
      <span>{Math.floor(item.temperature)}&deg;</span>
    </span>
    <img
      alt='Icon'
      className='icon'
      src={`/icons/${item.icon.slice(0, 2)}d.png`}
    />
    <span className='description'>{item.description}</span>
  </>
);

ForecastTab.propTypes = {
  item: PropTypes.object.isRequired
};

export default ForecastTab;
