import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchCountries, fetchCountryDetails, fetchCountryRisk } from "../../api/countriesAPI";

const initialState = {
  countries: [],
  selectedCountry: null,
  countryRisk: null,
  loading: false,
  error: null,
};

export const loadCountries = createAsyncThunk("countries/load", async (_, { rejectWithValue }) => {
  try {
    const response = await fetchCountries();
    return response.data;
  } catch (error) {
    return rejectWithValue(error.message); // Devolver error si la API falla
  }
});

export const loadCountryDetails = createAsyncThunk("countryDetails/load", async (countryCode, { rejectWithValue }) => {
  try {
    const response = await fetchCountryDetails(countryCode);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.message); // Devolver error si la API falla
  }
});

export const loadCountryRisk = createAsyncThunk("countryRisk/load", async (countryCode, { rejectWithValue }) => {
  try {
    const response = await fetchCountryRisk(countryCode);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.message); // Devolver error si la API falla
  }
});

const countriesSlice = createSlice({
  name: "countries",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadCountries.pending, (state) => {
        state.loading = true;
        state.error = null; // Limpiar el error cuando empieza la carga
      })
      .addCase(loadCountries.fulfilled, (state, action) => {
        state.loading = false;
        state.countries = action.payload;
      })
      .addCase(loadCountries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Manejar el error si la API falla
      })
      .addCase(loadCountryDetails.fulfilled, (state, action) => {
        state.selectedCountry = action.payload;
      })
      .addCase(loadCountryRisk.fulfilled, (state, action) => {
        state.countryRisk = action.payload;
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
