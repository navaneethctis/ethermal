import React from 'react';

import ForecastProvider from './contexts/forecast/ForecastProvider';

import HomePage from './components/page/HomePage';

function App() {
  return (
    <ForecastProvider>
      <HomePage />
    </ForecastProvider>
  );
}

export default App;
