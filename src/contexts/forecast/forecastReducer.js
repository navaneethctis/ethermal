import {
  SET_IS_LOADING,
  SET_HAS_ERROR,
  SET_SUN_TIMES,
  SET_FORECAST,
  SET_CHART_DATA,
  SET_SUGGESTIONS,
  CLEAR_SUGGESTIONS
} from '../types';

const forecastReducer = (state, {type, payload}) => {
  switch (type) {
    case SET_IS_LOADING:
      return {...state, isLoading: true};
    case SET_HAS_ERROR:
      return {...state, isLoading: false, hasError: true};
    case SET_SUN_TIMES:
      return {
        ...state,
        sunrise: new Date(payload.sunrise * 1000),
        sunset: new Date(payload.sunset * 1000)
      };
    case SET_FORECAST:
      return {...state, forecast: payload};
    case SET_CHART_DATA:
      return {...state, isLoading: false, hasError: false, chartData: payload};
    case SET_SUGGESTIONS:
      return {...state, suggestions: payload};
    case CLEAR_SUGGESTIONS:
      return {...state, suggestions: null};
    default:
      return state;
  }
};

export default forecastReducer;
