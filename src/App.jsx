// src/App.jsx
import React from 'react';
import UnitSwitcher from './components/UnitSwitcher';
import WeatherCard from './components/WeatherCard';

function App() {
  // Dane "na sztywno" - wymagane na ocenę 3.0 (zanim podłączymy API)
  // Zauważ, że dodaliśmy pole 'icon' (kody ikon OpenWeatherMap: 01d=słońce, 09d=deszcz itp.)
  const mockData = [
    { id: 1, city: "Warszawa", temp: 20, condition: "Słonecznie", rain: 0, wind: 15, icon: '01d' },
    { id: 2, city: "Wrocław", temp: 18, condition: "Pochmurno", rain: 10, wind: 20, icon: '03d' },
    { id: 3, city: "Kraków", temp: 22, condition: "Burza", rain: 60, wind: 30, icon: '11d' },
    { id: 4, city: "Gdańsk", temp: 15, condition: "Deszcz", rain: 40, wind: 25, icon: '09d' },
    { id: 5, city: "Londyn", temp: 12, condition: "Mgła", rain: 5, wind: 10, icon: '50d' },
  ];

  return (
    <div className="App" style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ textAlign: 'center' }}>Aplikacja Pogodowa 🌤️</h1>
      
      {/* Przełącznik jednostek */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
        <UnitSwitcher />
      </div>

      {/* Lista kart */}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {mockData.map((city) => (
          <WeatherCard key={city.id} weather={city} />
        ))}
      </div>
    </div>
  );
}

export default App;