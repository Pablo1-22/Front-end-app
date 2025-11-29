import React, { useState } from 'react';
import { fetchCitySuggestions } from '../api/weatherApi';
import './SearchBar.css';

const SearchBar = ({ onSearch }) => {
  const [city, setCity] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleInputChange = async (e) => {
    const value = e.target.value;
    setCity(value);
    if (value.length >= 3) {
      const cities = await fetchCitySuggestions(value);
      setSuggestions(cities);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setCity(suggestion.name);
    setSuggestions([]);
    setShowSuggestions(false);
    onSearch(suggestion.name);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city);
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="text"
          placeholder="Wpisz nazwę miasta..."
          value={city}
          onChange={handleInputChange}
          className="search-input"
        />
        <button type="submit" className="search-button">Szukaj</button>
      </form>

      {showSuggestions && suggestions.length > 0 && (
        <ul className="suggestions-list">
          {suggestions.map((item, index) => (
            <li 
              key={`${item.lat}-${index}`} 
              onClick={() => handleSuggestionClick(item)}
              className="suggestion-item"
            >
              <strong>{item.name}</strong>, {item.country} {item.state && `(${item.state})`}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;