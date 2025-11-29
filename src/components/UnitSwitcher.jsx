// src/components/UnitSwitcher.jsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setUnit } from '../store/weatherSlice';

const UnitSwitcher = () => {
  // 1. Pobieramy aktualną jednostkę z Reduxa
  const currentUnit = useSelector((state) => state.weather.unit);
  
  // 2. Pobieramy funkcję do wysyłania zmian (dispatch)
  const dispatch = useDispatch();

  // Funkcja obsługująca zmianę
  const handleUnitChange = (e) => {
    dispatch(setUnit(e.target.value));
  };

  return (
    <div style={{ margin: '1rem 0', padding: '10px', background: '#f0f0f0', borderRadius: '8px' }}>
      <label style={{ marginRight: '10px', fontWeight: 'bold' }}>Jednostka:</label>
      <select 
        value={currentUnit} 
        onChange={handleUnitChange}
        style={{ padding: '5px' }}
      >
        <option value="C">Celsjusz (°C)</option>
        <option value="F">Fahrenheit (°F)</option>
        <option value="K">Kelvin (K)</option>
      </select>
      <span style={{ marginLeft: '10px' }}>
        (Aktualnie wybrana: <strong>{currentUnit}</strong>)
      </span>
    </div>
  );
};

export default UnitSwitcher;