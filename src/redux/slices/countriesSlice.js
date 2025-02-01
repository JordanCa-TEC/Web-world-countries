import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// Estado inicial
const initialState = {
  countries: [],        // Lista de todos los países
  countryDetails: null, // Detalles de un país específico
  status: 'idle',       // Estado de la solicitud (idle, loading, failed)
  error: null,          // Para manejar los errores
};

// Función para obtener todos los países
const fetchCountryByName = async () => {
  try {
    const response = await axios.get('https://restcountries.com/v3.1/all');
    return response.data;
  } catch (error) {
    throw new Error('No se pudo obtener la lista de países: ' + error.message);
  }
};

// Función para obtener detalles de un país por código
const fetchCountryByCode = async (code) => {
  try {
    const response = await axios.get(`https://restcountries.com/v3.1/alpha/${code}`);
    return response.data;
  } catch (error) {
    throw new Error('No se pudo obtener los detalles del país: ' + error.message);
  }
};

// Acción asincrónica para obtener todos los países
export const fetchAllCountries = createAsyncThunk(
  'countries/fetchAllCountries',
  async () => {
    try {
      const response = await fetchCountryByName();
      return response; // Devuelve la lista de países
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
      const response = await fetchCountryByCode(code);
      return response;
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
    builder
      .addCase(fetchAllCountries.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchAllCountries.fulfilled, (state, action) => {
        state.status = 'idle';
        state.countries = action.payload;
      })
      .addCase(fetchAllCountries.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchCountryDetails.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchCountryDetails.fulfilled, (state, action) => {
        state.status = 'idle';
        state.countryDetails = action.payload;
      })
      .addCase(fetchCountryDetails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { setError } = countriesSlice.actions;
export const selectCountries = (state) => state.countries.countries;
export const selectCountryDetails = (state) => state.countries.countryDetails;
export const selectCountriesStatus = (state) => state.countries.status;
export const selectCountriesError = (state) => state.countries.error;

export default countriesSlice.reducer;
