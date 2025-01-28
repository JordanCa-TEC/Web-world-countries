import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://restcountries.com/v3.1',
});

// Función para obtener todos los países
export const fetchCountries = async () => {
  const response = await apiClient.get('/all');
  return response;
};

// Función para obtener detalles de un país por código
export const fetchCountryDetails = async (countryCode) => {
  const response = await apiClient.get(`/alpha/${countryCode}`);
  return response;
};

// Función para obtener el riesgo de un país por código (ajusta la URL con la API correspondiente)
export const fetchCountryRisk = async (countryCode) => {
  const response = await axios.get(`https://api.example.com/risk/${countryCode}`);
  return response;
};

export default apiClient;
