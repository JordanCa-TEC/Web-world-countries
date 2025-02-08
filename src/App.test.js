import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { fetchCountries } from './api/countriesAPI';

jest.mock('./api/countriesAPI');

// Función reutilizable para renderizar con Redux y React Router
const renderWithProviders = (ui) => {
  return render(
    <Provider store={store}>
      <BrowserRouter>{ui}</BrowserRouter>
    </Provider>
  );
};

// Limpiar mocks antes de cada prueba
beforeEach(() => {
  jest.clearAllMocks();
});

describe('App Component', () => {
  test('Muestra mensaje cuando no hay países disponibles', async () => {
    fetchCountries.mockResolvedValueOnce({ data: [] });

    renderWithProviders(<App />);

    const emptyMessage = await screen.findByText(/no countries available/i);
    expect(emptyMessage).toBeInTheDocument();
  });

  test('Muestra el enlace "Learn React"', async () => {
    renderWithProviders(<App />);

    const linkElement = await screen.findByText(/learn react/i);
    expect(linkElement).toBeInTheDocument();
  });
});
