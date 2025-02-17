import { configureStore } from '@reduxjs/toolkit';
import axios from 'axios';
import {
  fetchAllCountries,
  fetchCountryDetails,
  setError,
  selectCountries,
  selectCountryDetails,
  selectCountriesStatus,
  selectCountriesError,
} from './countriesSlice';

describe('Countries Slice', () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        countries: countriesSlice.reducer,
      },
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  describe('Initial State', () => {
    it('should have initial state', () => {
      expect(selectCountries(store.getState())).toEqual([]);
      expect(selectCountryDetails(store.getState())).toBeNull();
      expect(selectCountriesStatus(store.getState())).toBe('idle');
      expect(selectCountriesError(store.getState())).toBeNull();
    });
  });

  describe('fetchAllCountries', () => {
    it('should handle fetchAllCountries pending', async () => {
      const mockResponse = [{ name: { common: 'Test Country' }, cca3: 'TC' }];
      const mockGet = jest.spyOn(axios.get, 'get').mockResolvedValue({ data: mockResponse });

      await store.dispatch(fetchAllCountries());
      
      expect(mockGet).toHaveBeenCalled();
      expect(selectCountriesStatus(store.getState())).toBe('loading');
      expect(selectCountriesError(store.getState())).toBeNull();

      mockGet.mockRestore();
    });

    it('should handle fetchAllCountries fulfilled', async () => {
      const mockResponse = [{ name: { common: 'Test Country' }, cca3: 'TC' }];
      const mockGet = jest.spyOn(axios.get, 'get').mockResolvedValue({ data: mockResponse });

      await store.dispatch(fetchAllCountries());
      
      expect(mockGet).toHaveBeenCalled();
      expect(selectCountriesStatus(store.getState())).toBe('succeeded');
      expect(selectCountries(store.getState())).toEqual(mockResponse);
    });

    it('should handle fetchAllCountries rejected', async () => {
      const mockError = new Error('Network Error');
      const mockGet = jest.spyOn(axios.get, 'get').mockRejectedValueOnce(mockError);

      await expect(store.dispatch(fetchAllCountries())).rejects.toThrow(
        expect.objectContaining({
          message: expect.stringContaining('No se pudo obtener la lista de países'),
        })
      );

      expect(mockGet).toHaveBeenCalled();
      expect(selectCountriesStatus(store.getState())).toBe('failed');
      expect(selectCountriesError(store.getState())).toMatch(/No se pudo obtener la lista de países/);
    });
  });

  describe('fetchCountryDetails', () => {
    it('should handle fetchCountryDetails pending', async () => {
      const mockResponse = { name: { common: 'Test Country' }, cca3: 'TC' };
      const mockGet = jest.spyOn(axios.get, 'get').mockResolvedValue({ data: [mockResponse] });

      await store.dispatch(fetchCountryDetails('TC'));
      
      expect(mockGet).toHaveBeenCalled();
      expect(selectCountriesStatus(store.getState())).toBe('loading');
      expect(selectCountriesError(store.getState())).toBeNull();
    });

    it('should handle fetchCountryDetails fulfilled', async () => {
      const mockResponse = { name: { common: 'Test Country' }, cca3: 'TC' };
      const mockGet = jest.spyOn(axios.get, 'get').mockResolvedValue({ data: [mockResponse] });

      await store.dispatch(fetchCountryDetails('TC'));
      
      expect(mockGet).toHaveBeenCalled();
      expect(selectCountriesStatus(store.getState())).toBe('succeeded');
      expect(selectCountryDetails(store.getState())).toEqual(mockResponse);
    });

    it('should handle fetchCountryDetails rejected', async () => {
      const mockError = new Error('Network Error');
      const mockGet = jest.spyOn(axios.get, 'get').mockRejectedValueOnce(mockError);

      await expect(store.dispatch(fetchCountryDetails('TC'))).rejects.toThrow(
        expect.objectContaining({
          message: expect.stringContaining('No se pudo obtener los detalles del país'),
        })
      );

      expect(mockGet).toHaveBeenCalled();
      expect(selectCountriesStatus(store.getState())).toBe('failed');
      expect(selectCountriesError(store.getState())).toMatch(/No se pudo obtener los detalles del país/);
    });
  });

  describe('setError', () => {
    it('should update error state', () => {
      const mockError = 'Test Error';
      store.dispatch(setError(mockError));
      
      expect(selectCountriesError(store.getState())).toBe(mockError);
    });
  });
});