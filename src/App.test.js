import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';


// Mock de las funciones de la API
jest.mock('./api/countriesAPI', () => ({
  fetchCountries: jest.fn().mockResolvedValue({ data: [] }), 
  fetchCountryDetails: jest.fn(),
  fetchCountryRisk: jest.fn(),
}));


test('renders countries data', async () => {
  const { getByText } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );

 
  expect(screen.getByText(/learn react link/i)).toBeInTheDocument();
});