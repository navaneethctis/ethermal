import React from 'react';

import './Error.css';

const GeolocationError = () => (
  <div className='error'>
    <i className='fas fa-compass icon'></i>
    <span>Allow access for your location.</span>
  </div>
);

export default GeolocationError;
