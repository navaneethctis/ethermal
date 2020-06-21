import React, {useContext, useEffect} from 'react';

import ForecastContext from '../../contexts/forecast/ForecastContext';

import SearchBox from '../layout/SearchBox';
import ForecastSection from '../forecast/ForecastSection';

const HomePage = () => {
  const {getForecast} = useContext(ForecastContext);

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        async position =>
          getForecast(
            null,
            position.coords.latitude,
            position.coords.longitude
          ),
        error => console.error(error)
      );
    }

    // eslint-disable-next-line
  }, []);

  return (
    <>
      <SearchBox />
      <ForecastSection />
    </>
  );
};

export default HomePage;
