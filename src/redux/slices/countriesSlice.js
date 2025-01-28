import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchCountries, fetchCountryDetails, fetchCountryRisk } from "../../api/countriesAPI";

const initialState = {
  countries: [],
  selectedCountry: null,
  countryRisk: null,
  loading: false,
  error: null,
};

// Cargar países
export const loadCountries = createAsyncThunk(
  "countries/load",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchCountries();
      console.log("Datos de la API (loadCountries):", response.data); // Debug
      return response.data; // Asegúrate de que sea un array de países
    } catch (error) {
      console.error("Error al cargar países:", error.message); // Debug
      return rejectWithValue(error.message);
    }
  }
);

// Cargar detalles de un país
export const loadCountryDetails = createAsyncThunk(
  "countryDetails/load",
  async (countryCode, { rejectWithValue }) => {
    try {
      const response = await fetchCountryDetails(countryCode);
      console.log("Detalles del país:", response.data); // Debug
      return response.data;
    } catch (error) {
      console.error("Error al cargar detalles del país:", error.message); // Debug
      return rejectWithValue(error.message);
    }
  }
);

// Cargar riesgo del país
export const loadCountryRisk = createAsyncThunk(
  "countryRisk/load",
  async (countryCode, { rejectWithValue }) => {
    try {
      const response = await fetchCountryRisk(countryCode);
      console.log("Riesgo del país:", response.data); // Debug
      return response.data;
    } catch (error) {
      console.error("Error al cargar el riesgo del país:", error.message); // Debug
      return rejectWithValue(error.message);
    }
  }
);

const countriesSlice = createSlice({
  name: "countries",
  initialState,
  reducers: {}, // No se necesitan reducers locales en este caso
  extraReducers: (builder) => {
    builder
      .addCase(loadCountries.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadCountries.fulfilled, (state, action) => {
        state.loading = false;
        state.countries = action.payload; // Actualizar la lista de países
      })
      .addCase(loadCountries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Guardar el error
      })
      .addCase(loadCountryDetails.fulfilled, (state, action) => {
        state.selectedCountry = action.payload; // Actualizar el país seleccionado
      })
      .addCase(loadCountryRisk.fulfilled, (state, action) => {
        state.countryRisk = action.payload; // Actualizar el riesgo del país
      })
      .addCase(loadCountryDetails.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(loadCountryRisk.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default countriesSlice.reducer;
