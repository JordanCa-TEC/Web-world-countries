import '@testing-library/jest-dom';
import axios from 'axios';

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
