import { fetchCountryByRegion } from './api/countriesAPI';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';

// Mock de la función que llama a la API
jest.mock('./api/countriesAPI', () => ({
  fetchCountryByRegion: jest.fn(),
}));

const renderWithProviders = (ui) => {
  return render(
    <Provider store={store}>
      {ui}
    </Provider>
  );
};

beforeEach(() => {
  jest.clearAllMocks(); // Limpia cualquier mock previo
});

describe('App Component', () => {
  test('Muestra mensaje cuando no hay países disponibles', async () => {
    fetchCountryByRegion.mockResolvedValue([]);  // Mock de respuesta vacía

    renderWithProviders(<App />);

    // Usamos findByText en lugar de waitFor + getByText
    const noCountriesMessage = await screen.findByText(/no hay países disponibles/i);
    expect(noCountriesMessage).toBeInTheDocument();
  });

  test('Muestra mensaje de error si la API falla', async () => {
    fetchCountryByRegion.mockRejectedValue(new Error('Error al cargar los países'));  // Simula un error en la API

    renderWithProviders(<App />);

    const errorMessage = await screen.findByText(/error al cargar los países/i);
    expect(errorMessage).toBeInTheDocument();
  });

  test('Muestra la lista de países correctamente', async () => {
    fetchCountryByRegion.mockResolvedValue([  // Respuesta mockeada con países
      { name: { common: 'Argentina' } },
      { name: { common: 'Brasil' } },
    ]);

    renderWithProviders(<App />);

    // Usamos findByText para esperar los nombres de los países
    const argentina = await screen.findByText(/argentina/i);
    const brasil = await screen.findByText(/brasil/i);

    expect(argentina).toBeInTheDocument();
    expect(brasil).toBeInTheDocument();
  });
});
