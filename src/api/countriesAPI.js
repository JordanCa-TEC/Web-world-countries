import axios from 'axios';

// Crear instancia de Axios con configuración base
const apiClient = axios.create({
  baseURL: 'https://restcountries.com/v3.1', // Base URL de la API
  timeout: 10000, // Tiempo máximo de espera (10 segundos)
  headers: {
    'Content-Type': 'application/json',
  },
});

// Manejo de errores centralizado
const handleError = (error) => {
  console.error('Error al realizar la solicitud:', error.message);
  if (error.response) {
    console.error('Detalles del error:', error.response.data);
  }
  throw error; 
};

// Función para obtener todos los países
export const fetchCountries = async () => {
  try {
    const response = await apiClient.get('/all');
    return response.data; 
  } catch (error) {
    handleError(error); 
  }
};

// Función para obtener detalles de un país por código (ISO 3166-1 alpha-3)
export const fetchCountryDetails = async (countryCode) => {
  try {
    const response = await apiClient.get(`/alpha/${countryCode}`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// Función para obtener información adicional (ajusta la URL según tu caso)
export const fetchCountryRisk = async (countryCode) => {
  try {
    const response = await axios.get(
      `https://api.example.com/risk/${countryCode}`
    );
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export default apiClient;

