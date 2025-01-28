// --- src/redux/slices/countriesSlice.js ---
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchCountries, fetchCountryDetails } from '../../api/countriesAPI';  // Mantenemos las funciones originales

// Estado inicial
const initialState = {
  countries: [],        // Para almacenar la lista de países
  countryDetails: null, // Para almacenar los detalles de un país específico
  status: 'idle',       // Estado de la petición (idle, loading, failed)
  error: null,          // Para manejar errores
};

// Acción asincrónica para obtener todos los países
export const fetchAllCountries = createAsyncThunk(
  'countries/fetchAllCountries',
  async () => {
    try {
      const response = await fetchCountries();  // Usamos la función fetchCountries original
      return response; // Retornamos la respuesta (lista de países)
    } catch (error) {
      throw new Error('Failed to fetch countries: ' + error.message); // Mejor manejo de errores
    }
  }
);

// Acción asincrónica para obtener detalles de un país por código
export const fetchCountryByCode = createAsyncThunk(
  'countries/fetchCountryByCode',
  async (countryCode) => {
    try {
      const response = await fetchCountryDetails(countryCode);  // Usamos la función fetchCountryDetails original
      return response; // Retornamos la respuesta (detalles del país)
    } catch (error) {
      throw new Error('Failed to fetch country details: ' + error.message); // Mejor manejo de errores
    }
  }
);

// Slice de los países
export const countriesSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {
    setError: (state, action) => {
      state.error = action.payload; // Para manejar los errores desde fuera del slice
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCountries.pending, (state) => {
        state.status = 'loading';
        state.error = null; // Limpiar cualquier error previo
      })
      .addCase(fetchAllCountries.fulfilled, (state, action) => {
        state.status = 'idle';
        state.countries = action.payload; // Guardamos la lista de países
      })
      .addCase(fetchAllCountries.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message; // Guardamos el mensaje de error
        console.error('Error fetching countries:', action.error.message); // Depuración
      })
      .addCase(fetchCountryByCode.pending, (state) => {
        state.status = 'loading';
        state.error = null; // Limpiar cualquier error previo
      })
      .addCase(fetchCountryByCode.fulfilled, (state, action) => {
        state.status = 'idle';
        state.countryDetails = action.payload; // Guardamos los detalles del país
      })
      .addCase(fetchCountryByCode.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message; // Guardamos el mensaje de error
        console.error('Error fetching country details:', action.error.message); // Depuración
      });
  },
});

// Exportamos las acciones
export const { setError } = countriesSlice.actions;

// Selectores para acceder al estado
export const selectCountries = (state) => state.countries.countries;
export const selectCountryDetails = (state) => state.countries.countryDetails;
export const selectCountriesStatus = (state) => state.countries.status;
export const selectCountriesError = (state) => state.countries.error;

// Exportamos el reducer
export default countriesSlice.reducer;
