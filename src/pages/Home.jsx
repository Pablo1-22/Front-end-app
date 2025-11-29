// src/pages/Home.jsx
import React, { useState, useEffect, useMemo, useCallback } from 'react'; // <--- 1. Importujemy useCallback i useMemo
import { useSelector, useDispatch } from 'react-redux';
import SearchBar from '../components/SearchBar';
import WeatherCard from '../components/WeatherCard';
import { fetchWeatherByCity } from '../api/weatherApi';
import { addSearchedCity, removeSearchedCity } from '../store/weatherSlice';
import './Home.css';

const Home = () => {
  const citiesData = useSelector((state) => state.weather.searchedCities);
  const dispatch = useDispatch();
  const [error, setError] = useState('');

  // --- Implementacja useMemo ---
  // Sortujemy miasta tak, aby ostatnio dodane były na początku listy (odwracamy tablicę).
  // useMemo sprawia, że sortowanie wykona się TYLKO wtedy, gdy zmieni się 'citiesData'.
  // Gdy wpiszesz coś w searchbarze (zmieni się stan formularza), ta lista nie będzie mielona od nowa.
  const sortedCities = useMemo(() => {
    return [...citiesData].reverse();
  }, [citiesData]);

  const fetchAndAddCity = async (cityName) => {
    const data = await fetchWeatherByCity(cityName);
    if (data) {
      const formattedData = {
        id: data.id,
        city: data.name,
        temp: Math.round(data.main.temp),
        condition: data.weather[0].description,
        icon: data.weather[0].icon,
        rain: data.clouds ? data.clouds.all : 0,
        wind: data.wind.speed
      };
      dispatch(addSearchedCity(formattedData));
    }
  };

  useEffect(() => {
    const loadDefaults = async () => {
      if (citiesData.length === 0) {
        const defaultCities = ["Wrocław", "Warszawa", "Kraków", "Gdańsk", "Oleśnica"];
        for (const city of defaultCities) {
          await fetchAndAddCity(city);
        }
      }
    };
    loadDefaults();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // useEffect wykonuje się tylko raz (mount)

  const handleSearch = async (city) => {
    setError('');
    const alreadyOnList = citiesData.some(item => item.city.toLowerCase() === city.toLowerCase());
    
    if (alreadyOnList) {
      setError('To miasto jest już na liście!');
      return;
    }
    
    const data = await fetchWeatherByCity(city);
    if (data) {
      await fetchAndAddCity(city);
    } else {
      setError('Nie znaleziono miasta.');
    }
  };

  // --- Implementacja useCallback ---
  const handleRemove = useCallback((cityId) => {
    dispatch(removeSearchedCity(cityId));
  }, [dispatch]);

  return (
    <div className="page-container">
      <h2 className="page-title">Wyszukaj miasto 🔍</h2>
      
      <SearchBar onSearch={handleSearch} />
      {error && <p className="error-msg">{error}</p>}
      
      <div className="cards-grid">
        {sortedCities.length > 0 ? ( // Używamy posortowanej listy z useMemo
          sortedCities.map((city) => (
            <WeatherCard 
              key={city.id} 
              weather={city} 
              onDelete={handleRemove} // Przekazujemy zoptymalizowaną funkcję
            />
          ))
        ) : (
          <p className="empty-msg">Ładowanie miast...</p>
        )}
      </div>
    </div>
  );
};

export default Home;