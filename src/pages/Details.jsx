import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { fetchForecast } from '../api/weatherApi';
import './Details.css';

const Details = () => {
  const { city } = useParams();
  const [forecastData, setForecastData] = useState(null);
  const unit = useSelector((state) => state.weather.unit);

  useEffect(() => {
    const getData = async () => {
      const data = await fetchForecast(city);
      setForecastData(data);
    };
    getData();
  }, [city]);

  const convertTemp = (temp) => {
    if (unit === 'F') return Math.round((temp * 1.8) + 32);
    if (unit === 'K') return Math.round(temp + 273.15);
    return Math.round(temp);
  };

  if (!forecastData) return <div className="details-container">Ładowanie prognozy...</div>;

  const dailyForecast = forecastData.list.filter((reading) => reading.dt_txt.includes("12:00:00"));
  const current = forecastData.list[0];

  return (
    <div className="details-container">
      <Link to="/" className="back-btn">⬅ Wróć</Link>
      
      <h2 className="details-city-name">{forecastData.city.name}</h2>
      
      <div className="current-weather-card">
        <div className="main-info">
           <img 
             src={`http://openweathermap.org/img/wn/${current.weather[0].icon}@4x.png`} 
             alt="icon" 
             className="main-icon"
           />
           <div>
             <h1 className="temp-huge">
               {convertTemp(current.main.temp)}°{unit}
             </h1>
             <p className="weather-desc">
               {current.weather[0].description}
             </p>
           </div>
        </div>

        <div className="details-grid">
          <DetailItem label="☁ Zachmurzenie" value={`${current.clouds.all}%`} />
          <DetailItem label="💨 Wiatr" value={`${current.wind.speed} m/s`} />
          <DetailItem label="🧭 Kierunek" value={`${current.wind.deg}°`} />
          <DetailItem label="☔ Szansa opadów" value={`${Math.round(current.pop * 100)}%`} />
          <DetailItem label="💧 Opady (3h)" value={current.rain ? `${current.rain['3h']} mm` : '0 mm'} />
           <DetailItem label="Ciśnienie" value={`${current.main.pressure} hPa`} />
        </div>
      </div>

      <h3 className="forecast-title">Prognoza na kolejne dni</h3>
      <div className="forecast-list">
        {dailyForecast.map((day) => (
          <div key={day.dt} className="forecast-item">
            <span className="forecast-date">
              {new Date(day.dt * 1000).toLocaleDateString('pl-PL', { weekday: 'short', day: 'numeric', month: 'numeric' })}
            </span>
            <img 
              src={`http://openweathermap.org/img/wn/${day.weather[0].icon}.png`} 
              alt="weather" 
              style={{width: '50px'}}
            />
            <span className="forecast-temp">
              {convertTemp(day.main.temp)}°{unit}
            </span>
            <span style={{fontSize: '0.8rem', color: '#666'}}>
              {day.weather[0].description}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

const DetailItem = ({ label, value }) => (
  <div className="detail-item">
    <div className="detail-label">{label}</div>
    <div className="detail-value">{value}</div>
  </div>
);

export default Details;