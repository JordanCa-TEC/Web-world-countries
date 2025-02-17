import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// Estado inicial
const initialState = {
  countries: [],        // Lista de todos los países
  countryDetails: null, // Detalles de un país específico
  status: 'idle',       // Estado de la solicitud (idle, loading, failed, succeeded)
  error: null,          // Para manejar los errores
};

// Acción asincrónica para obtener todos los países
export const fetchAllCountries = createAsyncThunk(
  'countries/fetchAllCountries',
  async () => {
    try {
      const response = await axios.get('https://restcountries.com/v3.1/all');
      return response.data;
    } catch (error) {
      throw new Error('No se pudo obtener la lista de países: ' + error.message);
    }
  }
);

// Acción asincrónica para obtener detalles de un país por código
export const fetchCountryDetails = createAsyncThunk(
  'countries/fetchCountryDetails',
  async (code) => {
    try {
      const response = await axios.get(`https://restcountries.com/v3.1/alpha/${code}`);
      return response.data[0]; // Tomamos solo el primer objeto del array
    } catch (error) {
      throw new Error('No se pudo obtener los detalles del país: ' + error.message);
    }
  }
);

// Slice de los países
export const countriesSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    const handlePending = (state) => {
      state.status = 'loading';
      state.error = null;
    };

    const handleFulfilled = (state, action, type) => {
      state.status = 'succeeded';
      if (type === 'fetchAllCountries') {
        state.countries = action.payload;
      } else if (type === 'fetchCountryDetails') {
        state.countryDetails = action.payload;
      }
    };

    const handleRejected = (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    };

    builder
      .addCase(fetchAllCountries.pending, handlePending)
      .addCase(fetchAllCountries.fulfilled, (state, action) => handleFulfilled(state, action, 'fetchAllCountries'))
      .addCase(fetchAllCountries.rejected, handleRejected)
      .addCase(fetchCountryDetails.pending, handlePending)
      .addCase(fetchCountryDetails.fulfilled, (state, action) => handleFulfilled(state, action, 'fetchCountryDetails'))
      .addCase(fetchCountryDetails.rejected, handleRejected);
  },
});

export const { setError } = countriesSlice.actions;
export const selectCountries = (state) => state.countries.countries;
export const selectCountryDetails = (state) => state.countries.countryDetails;
export const selectCountriesStatus = (state) => state.countries.status;
export const selectCountriesError = (state) => state.countries.error;

export default countriesSlice.reducer;
