import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setUnit } from '../store/weatherSlice';
import './UnitSwitcher.css';

const UnitSwitcher = () => {
  const currentUnit = useSelector((state) => state.weather.unit);
  const dispatch = useDispatch();

  return (
    <div className="unit-switcher">
      <label className="unit-label">Jednostka:</label>
      <select 
        value={currentUnit} 
        onChange={(e) => dispatch(setUnit(e.target.value))}
        className="unit-select"
      >
        <option value="C">Celsjusz (°C)</option>
        <option value="F">Fahrenheit (°F)</option>
        <option value="K">Kelvin (K)</option>
      </select>
    </div>
  );
};

export default UnitSwitcher;