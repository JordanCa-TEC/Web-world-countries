import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../redux/slices/countriesSlice';
import countriesReducer from '../redux/slices/countriesSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    countries: countriesReducer,
  },
});
