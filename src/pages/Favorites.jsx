import React from 'react';
import { useSelector } from 'react-redux';
import WeatherCard from '../components/WeatherCard';
import './Home.css'; // Używamy tych samych stylów

const Favorites = () => {
  const favorites = useSelector((state) => state.weather.favorites);

  return (
    <div className="page-container">
      <h2 className="page-title">Twoje Ulubione Miasta ⭐</h2>
      
      {favorites.length === 0 ? (
        <p className="empty-msg">Nie masz jeszcze ulubionych miast. Dodaj je gwiazdką na stronie głównej!</p>
      ) : (
        <div className="cards-grid">
          {favorites.map((city) => (
            <WeatherCard key={city.id} weather={city} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;