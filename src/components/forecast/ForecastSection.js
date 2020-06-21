import React, {useContext, useEffect, useState} from 'react';
import Swiper from 'react-id-swiper';

import 'swiper/css/swiper.min.css';
import './ForecastSection.css';

import ForecastContext from '../../contexts/forecast/ForecastContext';

import Error from '../layout/Error';
import ForecastTab from './ForecastTab';
import ForecastCard from './ForecastCard';
import GeolocationError from '../layout/GeolocationError';
import Spinner from '../layout/Spinner';

const ForecastSection = () => {
  const {
    state: {isLoading, hasError, forecast}
  } = useContext(ForecastContext);

  const [tabSwiper, getTabSwiper] = useState(null);
  const [cardSwiper, getCardSwiper] = useState(null);

  useEffect(() => {
    if (
      tabSwiper &&
      tabSwiper.controller &&
      cardSwiper &&
      cardSwiper.controller
    ) {
      tabSwiper.controller.control = cardSwiper;
      cardSwiper.controller.control = tabSwiper;
    }
  }, [tabSwiper, cardSwiper]);

  const tabSwiperParams = {
    centeredSlides: true,
    containerClass: 'tab-swiper-container',
    getSwiper: getTabSwiper,
    slidesPerView: 'auto',
    slideToClickedSlide: true,
    slideClass: 'forecast-tab',
    touchRatio: 0.2,
    wrapperClass: 'tab-swiper-wrapper'
  };

  const cardSwiperParams = {
    containerClass: 'card-swiper-container',
    getSwiper: getCardSwiper,
    slideClass: 'forecast-card',
    spaceBetween: 32,
    wrapperClass: 'card-swiper-wrapper'
  };

  if (!isLoading && !hasError && !forecast) return <GeolocationError />;

  if (isLoading) return <Spinner />;

  if (hasError) return <Error />;

  if (!forecast) return null;

  return (
    <main className='forecast-section'>
      <Swiper {...tabSwiperParams}>
        {forecast.map((item, index) => (
          <div key={index}>
            <ForecastTab item={item} />
          </div>
        ))}
      </Swiper>
      <Swiper {...cardSwiperParams}>
        {forecast.map((item, index) => (
          <div key={index}>
            <ForecastCard index={index} item={item} />
          </div>
        ))}
      </Swiper>
    </main>
  );
};

export default ForecastSection;
