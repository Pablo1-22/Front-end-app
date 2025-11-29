import axios from 'axios';

const API_KEY = '8919c178693bedaddad0ce0dcbbac90d';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

// Funkcja 1: Pobieranie pogody
export const fetchWeatherByCity = async (city) => {
  try {
    const response = await axios.get(`${BASE_URL}/weather?q=${city}&units=metric&lang=pl&appid=${API_KEY}`);
    return response.data;
  } catch (error) {
    console.error("Błąd pobierania pogody:", error);
    return null;
  }
}; 

// Funkcja 2: Autouzupełnianie 
export const fetchCitySuggestions = async (query) => {
  try {
    const GEO_URL = 'https://api.openweathermap.org/geo/1.0/direct';
    const response = await axios.get(`${GEO_URL}?q=${query}&limit=5&appid=${API_KEY}`);
    return response.data;
  } catch (error) {
    console.error("Błąd pobierania podpowiedzi:", error);
    return [];
  }
};

// Funkcja 3: Pobieranie prognozy na 5 dni
export const fetchForecast = async (city) => {
  try {
    // Endpoint /forecast zwraca dane co 3 godziny na 5 dni
    const response = await axios.get(`${BASE_URL}/forecast?q=${city}&units=metric&lang=pl&appid=${API_KEY}`);
    return response.data;
  } catch (error) {
    console.error("Błąd pobierania prognozy:", error);
    return null;
  }
};