import React, {useContext, useEffect, useState} from 'react';

import './SearchBox.css';

import ForecastContext from '../../contexts/forecast/ForecastContext';

const SearchBox = () => {
  const {
    state: {suggestions},
    getForecast: getForecastGlobal,
    getSuggestions,
    clearSuggestions
  } = useContext(ForecastContext);

  const [query, setQuery] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    if (!query || hasSearched) return clearSuggestions();

    getSuggestions(query);

    // eslint-disable-next-line
  }, [query]);

  const handleChange = event => {
    setQuery(event.target.value);

    if (hasSearched) setHasSearched(false);
  };

  const getForecast = event => {
    event.preventDefault();

    getForecastGlobal(query);

    clearSuggestions();
  };

  const getForecastFromSuggestions = placeName => {
    setQuery(`${placeName.split(', ')[0]}, ${placeName.split(', ')[1]}`);

    getForecastGlobal(placeName);

    setHasSearched(true);
  };

  return (
    <section className='search-box'>
      <form onSubmit={getForecast}>
        <i className='fas fa-map-marker-alt icon-left'></i>
        <input
          onChange={handleChange}
          value={query}
          autoComplete='off'
          name='query'
          placeholder='Search'
          type='text'
        />
        <button>
          <i className='fas fa-search icon-right'></i>
        </button>
        {query && suggestions && (
          <div className='suggestions'>
            {suggestions.map((suggestion, index) => (
              <div
                onClick={() => getForecastFromSuggestions(suggestion.placeName)}
                key={index}
                className='suggestion'
              >
                <span className='name'>
                  <span className='first'>
                    {`${suggestion.placeName.split(', ')[0]}${
                      suggestion.placeName.split(', ').length > 1 ? ', ' : ''
                    }`}
                  </span>
                  <span className='last'>
                    {suggestion.placeName.split(', ')[1]
                      ? suggestion.placeName.split(', ')[1]
                      : ''}
                  </span>
                </span>
                <div className='summary'>
                  <span className='weather'>
                    <span>{Math.floor(suggestion.temperature)}&deg;C</span>
                    <span>{suggestion.description}</span>
                  </span>
                  <img
                    alt='Icon'
                    className='icon'
                    src={`/icons/${suggestion.icon.slice(0, 2)}d.png`}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </form>
    </section>
  );
};

export default SearchBox;
