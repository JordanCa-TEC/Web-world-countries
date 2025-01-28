import axios from 'axios';

// Crear instancia de Axios con configuración base
const apiClient = axios.create({
  baseURL: 'https://restcountries.com/v3.1/all', // Base URL de la API de países
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

// Función para buscar por nombre del país
export const fetchCountryByName = async (name) => {
  try {
    const response = await apiClient.get(`/name/${name}`);
    console.log(`Detalles del país por nombre (${name}):`, response.data);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// Función para buscar por nombre completo del país
export const fetchCountryFullName = async (name) => {
  try {
    const response = await apiClient.get(`/name/${name}?fullText=true`);
    console.log(`Detalles del país por nombre completo (${name}):`, response.data);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// Función para buscar por código del país (cca2, ccn3, cca3, cioc)
export const fetchCountryByCode = async (code) => {
  try {
    const response = await apiClient.get(`/alpha/${code}`);
    console.log(`Detalles del país por código (${code}):`, response.data);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// Función para buscar por una lista de códigos
export const fetchCountriesByCodes = async (codes) => {
  try {
    const response = await apiClient.get(`/alpha?codes=${codes}`);
    console.log(`Detalles de países por códigos (${codes}):`, response.data);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// Función para buscar por código de moneda
export const fetchCountryByCurrency = async (currency) => {
  try {
    const response = await apiClient.get(`/currency/${currency}`);
    console.log(`Detalles del país por moneda (${currency}):`, response.data);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// Función para buscar por gentilicio (nombre de los ciudadanos)
export const fetchCountryByDemonym = async (demonym) => {
  try {
    const response = await apiClient.get(`/demonym/${demonym}`);
    console.log(`Detalles del país por gentilicio (${demonym}):`, response.data);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// Función para buscar por idioma
export const fetchCountryByLanguage = async (language) => {
  try {
    const response = await apiClient.get(`/lang/${language}`);
    console.log(`Detalles del país por idioma (${language}):`, response.data);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// Función para buscar por ciudad capital
export const fetchCountryByCapital = async (capital) => {
  try {
    const response = await apiClient.get(`/capital/${capital}`);
    console.log(`Detalles del país por capital (${capital}):`, response.data);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// Función para buscar por región
export const fetchCountryByRegion = async (region) => {
  try {
    const response = await apiClient.get(`/region/${region}`);
    console.log(`Detalles del país por región (${region}):`, response.data);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// Función para buscar por subregión
export const fetchCountryBySubregion = async (subregion) => {
  try {
    const response = await apiClient.get(`/subregion/${subregion}`);
    console.log(`Detalles del país por subregión (${subregion}):`, response.data);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// Función para buscar por traducción
export const fetchCountryByTranslation = async (translation) => {
  try {
    const response = await apiClient.get(`/translation/${translation}`);
    console.log(`Detalles del país por traducción (${translation}):`, response.data);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// Función para filtrar la respuesta y obtener campos específicos
export const fetchCountryWithFilter = async (service, fields) => {
  try {
    const response = await apiClient.get(`/${service}?fields=${fields}`);
    console.log(`Detalles del país filtrados (${service}):`, response.data);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export default apiClient;
