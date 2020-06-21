import axios from 'axios';
import React, {useReducer} from 'react';

import ForecastContext from './ForecastContext';
import {
  SET_IS_LOADING,
  SET_HAS_ERROR,
  SET_SUN_TIMES,
  SET_FORECAST,
  SET_CHART_DATA,
  SET_SUGGESTIONS,
  CLEAR_SUGGESTIONS
} from '../types';
import forecastReducer from './forecastReducer';

class ForecastItem {
  constructor(item) {
    this.date = item.dt_txt;
    this.description = item.weather[0].main;
    this.feelsLike = item.main.feels_like;
    this.humidity = item.main.humidity;
    this.icon = item.weather[0].icon;
    this.pressure = item.main.pressure;
    this.temperature = item.main.temp;
  }
}

class ChartDataItem {
  constructor(items) {
    this.labels = items.map(item => {
      const time = new Date(item.dt_txt).toLocaleTimeString();

      return `${time[0]}${time.slice(-2).toLowerCase()}`;
    });
    this.datasets = [
      {
        backgroundColor: '#fff',
        borderColor: '#36a6e6',
        borderJoinStyle: 'square',
        borderWidth: 2,
        data: items.map(item => Math.floor(item.main.temp)),
        fill: false,
        pointRadius: 4
      }
    ];
  }
}

class SuggestionItem {
  constructor(placeName, item) {
    this.description = item.data.weather[0].main;
    this.icon = item.data.weather[0].icon;
    this.placeName = placeName;
    this.temperature = item.data.main.temp;
  }
}

const ForecastProvider = ({children}) => {
  const [state, dispatch] = useReducer(forecastReducer, {
    isLoading: false,
    hasError: false,
    forecast: null,
    chartData: null,
    sunrise: null,
    sunset: null,
    suggestions: null
  });

  const setIsLoading = () => dispatch({type: SET_IS_LOADING});

  const getForecast = async (query, latitude, longitude) => {
    setIsLoading();

    const apiKey = 'f65f8617e2ce67d270dda70aef592135';

    let url = 'https://api.openweathermap.org/data/2.5/forecast';

    if (query) url += `?q=${query}`;
    else url += `?lat=${latitude}&lon=${longitude}`;

    url += `&units=metric&appid=${apiKey}`;

    try {
      const {
        data: {
          city: {sunrise, sunset},
          list
        }
      } = await axios.get(url);

      dispatch({type: SET_SUN_TIMES, payload: {sunrise, sunset}});

      const forecast = list.reduce((items, item, index) => {
        if (
          !index ||
          item.dt_txt.split(' ')[0] !== list[index - 1].dt_txt.split(' ')[0]
        )
          items.push(new ForecastItem(item));

        return items;
      }, []);

      dispatch({type: SET_FORECAST, payload: forecast});

      getChartData(list);
    } catch (error) {
      console.log(error.message);

      dispatch({type: SET_HAS_ERROR});
    }
  };

  const getChartData = list => {
    let {items: chartData} = list.reduce(
      (data, item, index) => {
        if (
          !index ||
          item.dt_txt.split(' ')[0] !== list[index - 1].dt_txt.split(' ')[0]
        ) {
          data.items.push([]);
          data.count++;
          data.items[data.count].push(item);
        } else data.items[data.count].push(item);

        return data;
      },
      {count: -1, items: []}
    );

    chartData = chartData.map(items => new ChartDataItem(items));

    dispatch({type: SET_CHART_DATA, payload: chartData});
  };

  const getSuggestions = async query => {
    const accessToken =
      'pk.eyJ1IjoibmF2YW5lZXRoY3RpcyIsImEiOiJja2Jvc2t3cDkyNGkyMnNteTVtM2ozMm1rIn0.5ESs3nprIcQYohuEJsRmXw';

    const apiKey = 'f65f8617e2ce67d270dda70aef592135';

    try {
      const {
        data: {features}
      } = await axios.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?autocomplete=true&types=country,region,district&access_token=${accessToken}`
      );

      const getSummaries = features.map(({place_name}) =>
        (async () => {
          return await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${place_name}&units=metric&appid=${apiKey}`
          );
        })()
      );

      const suggestions = (await Promise.allSettled(getSummaries)).reduce(
        (summaries, {status, value}, index) => {
          if (status !== 'rejected')
            summaries.push(
              new SuggestionItem(features[index].place_name, value)
            );

          return summaries;
        },
        []
      );

      dispatch({type: SET_SUGGESTIONS, payload: suggestions});
    } catch (error) {
      console.log(error.message);

      dispatch({type: SET_HAS_ERROR});
    }
  };

  const clearSuggestions = () => dispatch({type: CLEAR_SUGGESTIONS});

  return (
    <ForecastContext.Provider
      value={{state, getForecast, getSuggestions, clearSuggestions}}
    >
      {children}
    </ForecastContext.Provider>
  );
};

export default ForecastProvider;
