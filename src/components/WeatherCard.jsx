// src/components/WeatherCard.jsx
import React from 'react';
import { useSelector } from 'react-redux';

const WeatherCard = ({ weather }) => {
  // 1. Pobieramy aktualną jednostkę z Reduxa (C, F lub K)
  const unit = useSelector((state) => state.weather.unit);

  // 2. Funkcja przeliczająca temperaturę (zakładamy, że dane wejściowe są w Celsjuszach)
  const convertTemp = (tempInC) => {
    if (unit === 'F') return Math.round((tempInC * 1.8) + 32);
    if (unit === 'K') return Math.round(tempInC + 273.15);
    return tempInC; // Domyślnie Celsjusz
  };

  // 3. Budujemy URL do ikony (korzystamy z darmowych ikon OpenWeatherMap)
  // Jeśli nie mamy kodu ikony, używamy domyślnego słoneczka
  const iconUrl = weather.icon 
    ? `http://openweathermap.org/img/wn/${weather.icon}@2x.png`
    : 'http://openweathermap.org/img/wn/01d@2x.png';

  return (
    <div style={styles.card}>
      <h3>{weather.city}</h3>
      <div style={styles.row}>
        <img src={iconUrl} alt="pogoda" style={{ width: '50px', height: '50px' }} />
        <h2 style={{ margin: 0 }}>
          {convertTemp(weather.temp)} °{unit}
        </h2>
      </div>
      <p style={{ margin: '5px 0', fontStyle: 'italic' }}>{weather.condition}</p>
      
      {/* Sekcja szczegółów (wymagana na ocenę 3.0) */}
      <div style={styles.details}>
        <span>💧 Deszcz: {weather.rain}%</span>
        <span>💨 Wiatr: {weather.wind} km/h</span>
      </div>
    </div>
  );
};

// Proste style bezpośrednio w pliku (żeby było szybciej)
const styles = {
  card: {
    border: '1px solid #ddd',
    borderRadius: '10px',
    padding: '15px',
    margin: '10px',
    width: '200px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  row: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px'
  },
  details: {
    marginTop: '10px',
    fontSize: '0.8rem',
    color: '#666',
    display: 'flex',
    flexDirection: 'column',
    gap: '4px'
  }
};

export default WeatherCard;