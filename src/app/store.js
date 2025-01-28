import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import countriesReducer from '../redux/slices/countriesSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    countries: countriesReducer,
  },
});
