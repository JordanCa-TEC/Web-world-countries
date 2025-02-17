import { configureStore } from '@reduxjs/toolkit';
import countriesReducer from '../redux/slices/countriesSlice';

export const store = configureStore({
  reducer: {
    countries: countriesReducer,
  },
});
