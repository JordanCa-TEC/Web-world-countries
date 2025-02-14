import '@testing-library/jest-dom';
// import axios from 'axios';

process.env.NODE_ENV = 'test';

// Mock de axios
jest.mock('axios', () => ({
  get: jest.fn(() => Promise.resolve({ data: [] })),
  post: jest.fn(() => Promise.resolve({})),
}));

// Mock de las funciones de la API
jest.mock('./api/countriesAPI', () => ({
  fetchCountries: jest.fn().mockResolvedValue({ data: [] }),
  fetchCountryDetails: jest.fn().mockResolvedValue({ data: {} }),
  fetchCountryRisk: jest.fn().mockResolvedValue({ data: {} }),
}));

// Establecer el tiempo de espera de las pruebas en 10 segundos (10000 ms)
jest.setTimeout(10000);
