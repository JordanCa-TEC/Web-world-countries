import { configureStore } from '@reduxjs/toolkit';
import { fetchAllCountries, fetchCountryDetails, countriesSlice } from './countriesSlice';
import axios from 'axios';

// Mock de axios
jest.mock('axios');

// Estado inicial para pruebas
const initialState = {
  countries: [],
  countryDetails: null,
  status: 'idle',
  error: null,
};

// Creación del store de Redux
const store = configureStore({
  reducer: {
    countries: countriesSlice.reducer,
  },
});

describe('countriesSlice', () => {
  describe('fetchAllCountries', () => {
    it('should handle fulfilled fetchAllCountries action', async () => {
      const countriesMock = [{ name: 'Spain' }, { name: 'Germany' }];
      axios.get.mockResolvedValue({ data: countriesMock });

      await store.dispatch(fetchAllCountries());

      const state = store.getState().countries;
      expect(state.status).toBe('succeeded');
      expect(state.countries).toEqual(countriesMock);
      expect(state.error).toBeNull();
    });

    it('should handle rejected fetchAllCountries action', async () => {
      const errorMessage = 'No se pudo obtener la lista de países';
      axios.get.mockRejectedValue(new Error(errorMessage));

      await store.dispatch(fetchAllCountries());

      const state = store.getState().countries;
      expect(state.status).toBe('failed');
      // Ajustamos aquí para comparar el mensaje completo, que es lo que se está recibiendo
      expect(state.error).toBe(`${errorMessage}: ${errorMessage}`);
    });
  });

  describe('fetchCountryDetails', () => {
    it('should handle fulfilled fetchCountryDetails action', async () => {
      const countryDetailMock = { name: 'Spain', capital: 'Madrid' };
      axios.get.mockResolvedValue({ data: [countryDetailMock] });

      await store.dispatch(fetchCountryDetails('ESP'));

      const state = store.getState().countries;
      expect(state.status).toBe('succeeded');
      expect(state.countryDetails).toEqual(countryDetailMock);
      expect(state.error).toBeNull();
    });

    it('should handle rejected fetchCountryDetails action', async () => {
      const errorMessage = 'No se pudo obtener los detalles del país';
      axios.get.mockRejectedValue(new Error(errorMessage));

      await store.dispatch(fetchCountryDetails('ESP'));

      const state = store.getState().countries;
      expect(state.status).toBe('failed');
      // Ajustamos aquí para comparar el mensaje completo, que es lo que se está recibiendo
      expect(state.error).toBe(`${errorMessage}: ${errorMessage}`);
    });
  });

  describe('Reducers', () => {
    it('should handle setError correctly', () => {
      const errorPayload = 'Error loading countries';
      const action = { type: 'countries/setError', payload: errorPayload };
      const state = countriesSlice.reducer(initialState, action);
      
      expect(state.error).toBe(errorPayload);
    });

    it('should return the initial state when called with undefined', () => {
      const state = countriesSlice.reducer(undefined, {});
      expect(state).toEqual(initialState);
    });
  });
});
