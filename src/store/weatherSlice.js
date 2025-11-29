// src/store/weatherSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  unit: 'C', // Domyślna jednostka: Celsjusz
};

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    // Akcja do zmiany jednostki
    setUnit: (state, action) => {
      state.unit = action.payload; // np. 'F' lub 'K'
    },
  },
});

export const { setUnit } = weatherSlice.actions;
export default weatherSlice.reducer;