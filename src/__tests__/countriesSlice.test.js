import reducer, {
  fetchAllCountries,
  fetchCountryDetails,
  setError,
} from '../redux/slices/countriesSlice';
import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

// Crear un mock de axios
const mock = new MockAdapter(axios);

// Estado inicial
const initialState = {
  countries: [],
  countryDetails: null,
  status: 'idle',  // Este estado se actualizará según las acciones
  error: null,
};

describe('countriesSlice', () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer,
      middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
    });
  });

  afterEach(() => {
    mock.reset();
  });

  test('debe retornar el estado inicial', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  test('debe manejar la acción setError', () => {
    const errorMessage = 'Hubo un error';
    const nextState = reducer(initialState, setError(errorMessage));
    expect(nextState.error).toBe(errorMessage);
  });

  test('fetchAllCountries debe cambiar el estado al cumplirse', async () => {
    const fakeCountries = [{ name: { common: 'Peru' } }, { name: { common: 'Argentina' } }];
    mock.onGet('https://restcountries.com/v3.1/all').reply(200, fakeCountries);

    await store.dispatch(fetchAllCountries());
    const state = store.getState();

    expect(state.countries).toEqual(fakeCountries);
    expect(state.status).toBe('succeeded');  // Cambiar a 'succeeded' cuando la operación es exitosa
    expect(state.error).toBeNull();
  });

  test('fetchAllCountries debe manejar errores', async () => {
    mock.onGet('https://restcountries.com/v3.1/all').reply(500);

    await store.dispatch(fetchAllCountries());
    const state = store.getState();

    expect(state.status).toBe('failed');  // Cambiar a 'failed' cuando ocurre un error
    expect(state.error).toBeDefined();
  });

  test('fetchCountryDetails debe cambiar el estado al cumplirse', async () => {
    const fakeCountry = { name: { common: 'Peru' }, cca3: 'PER' };
    mock.onGet('https://restcountries.com/v3.1/alpha/PER').reply(200, [fakeCountry]);

    await store.dispatch(fetchCountryDetails('PER'));
    const state = store.getState();

    expect(state.countryDetails).toEqual(fakeCountry);
    expect(state.status).toBe('succeeded');  // Cambiar a 'succeeded' al cumplirse
    expect(state.error).toBeNull();
  });

  test('fetchCountryDetails debe manejar errores', async () => {
    mock.onGet('https://restcountries.com/v3.1/alpha/PER').reply(404);

    await store.dispatch(fetchCountryDetails('PER'));
    const state = store.getState();

    expect(state.status).toBe('failed');  // Cambiar a 'failed' cuando ocurre un error
    expect(state.error).toBeDefined();
  });
});
