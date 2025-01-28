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
  } else if (error.request) {
    console.error('No se recibió respuesta del servidor:', error.request);
  } else {
    console.error('Error al configurar la solicitud:', error.message);
  }
  throw new Error(error.response?.data?.message || 'Error en la solicitud');
};

// Función para obtener todos los países
export const fetchCountries = async () => {
  try {
    const response = await apiClient.get('/all');
    console.log('Países obtenidos:', response.data); // Log para depuración
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// Función para obtener detalles de un país por código (ISO 3166-1 alpha-3)
export const fetchCountryDetails = async (countryCode) => {
  try {
    const response = await apiClient.get(`/alpha/${countryCode}`);
    console.log(`Detalles del país (${countryCode}):`, response.data); // Log para depuración
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// Función para obtener información adicional (ajusta la URL según tu caso)
export const fetchCountryRisk = async (countryCode) => {
  try {
    const response = await axios.get(
      `https://api.example.com/risk/${countryCode}` // Endpoint de ejemplo
    );
    console.log(`Riesgo del país (${countryCode}):`, response.data); // Log para depuración
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export default apiClient;
