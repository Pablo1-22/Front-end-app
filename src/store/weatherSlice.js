// src/store/weatherSlice.js
import { createSlice } from '@reduxjs/toolkit';

const loadState = () => {
  try {
    const serializedState = localStorage.getItem('weatherAppConfig');
    if (serializedState === null) {
      // Domyślny stan: Celsjusz, brak ulubionych, brak historii wyszukiwania
      return { unit: 'C', favorites: [], searchedCities: [] };
    }
    const loadedState = JSON.parse(serializedState);
    
    // Zabezpieczenie: gdyby stary zapis nie miał pola searchedCities, dodajemy je
    if (!loadedState.searchedCities) loadedState.searchedCities = [];
    
    return loadedState;
  } catch (err) {
    return { unit: 'C', favorites: [], searchedCities: [] };
  }
};

const initialState = loadState();

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    setUnit: (state, action) => {
      state.unit = action.payload;
      localStorage.setItem('weatherAppConfig', JSON.stringify(state));
    },
    toggleFavorite: (state, action) => {
      const city = action.payload;
      const index = state.favorites.findIndex(item => item.id === city.id);
      
      if (index >= 0) {
        state.favorites.splice(index, 1);
      } else {
        state.favorites.push(city);
      }
      localStorage.setItem('weatherAppConfig', JSON.stringify(state));
    },
    // 👇 NOWA AKCJA: Dodawanie wyszukanego miasta do listy głównej
    addSearchedCity: (state, action) => {
      const newCity = action.payload;
      // Sprawdzamy duplikaty, żeby nie dodać tego samego miasta dwa razy
      const exists = state.searchedCities.some(city => city.id === newCity.id);
      
      if (!exists) {
        state.searchedCities.push(newCity);
        // Zapisujemy też do LocalStorage, żeby lista przetrwała odświeżenie strony
        localStorage.setItem('weatherAppConfig', JSON.stringify(state));
      }
    },
    // Opcjonalnie: Czyszczenie listy (może się przydać w przyszłości)
    removeSearchedCity: (state, action) => {
      state.searchedCities = state.searchedCities.filter(city => city.id !== action.payload);
      localStorage.setItem('weatherAppConfig', JSON.stringify(state));
    }
  },
});

// Eksportujemy nową akcję addSearchedCity
export const { setUnit, toggleFavorite, addSearchedCity, removeSearchedCity } = weatherSlice.actions;
export default weatherSlice.reducer;