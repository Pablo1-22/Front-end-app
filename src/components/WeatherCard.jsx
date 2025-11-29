import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleFavorite } from '../store/weatherSlice';
import { Link } from 'react-router-dom';
import './WeatherCard.css';

const WeatherCard = ({ weather, onDelete }) => {
  const unit = useSelector((state) => state.weather.unit);
  const favorites = useSelector((state) => state.weather.favorites);
  const dispatch = useDispatch();

  const isFavorite = favorites.some(city => city.id === weather.id);

  const convertTemp = (tempInC) => {
    if (unit === 'F') return Math.round((tempInC * 1.8) + 32);
    if (unit === 'K') return Math.round(tempInC + 273.15);
    return Math.round(tempInC);
  };

  const iconUrl = weather.icon 
    ? `http://openweathermap.org/img/wn/${weather.icon}@2x.png`
    : 'http://openweathermap.org/img/wn/01d@2x.png';

  return (
    <div className="weather-card">
      <div className="card-header">
        <h3 className="city-name">{weather.city}</h3>
        <div className="card-actions">
          <button 
            onClick={() => dispatch(toggleFavorite(weather))}
            className="icon-btn"
            style={{ color: isFavorite ? 'gold' : '#ccc' }} // Kolor dynamiczny zostawiamy inline
            title={isFavorite ? "Usuń z ulubionych" : "Dodaj do ulubionych"}
          >
            ★
          </button>

          {onDelete && (
            <button 
              onClick={() => onDelete(weather.id)}
              className="icon-btn delete"
              title="Usuń z listy"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      <div className="card-main">
        <img src={iconUrl} alt="pogoda" className="weather-icon" />
        <h2 className="temperature">
          {convertTemp(weather.temp)}°{unit}
        </h2>
      </div>
      
      <p className="condition">{weather.condition}</p>
      
      <div className="card-details">
        <span>💧 {weather.rain}%</span>
        <span>💨 {weather.wind} km/h</span>
      </div>

      <Link to={`/details/${weather.city}`} className="details-btn">
        Szczegóły ➡
      </Link>
    </div>
  );
};

export default WeatherCard;