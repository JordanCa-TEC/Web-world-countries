import { fetchCountryByRegion } from './api/countriesAPI';  // Actualiza esto con la función correcta
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';

// Mock de la función que llama a la API
jest.mock('./api/countriesAPI', () => ({
  fetchCountryByRegion: jest.fn(), // Aquí puedes mockear la función que estés usando en el componente
}));

const renderWithProviders = (ui) => {
  return render(
    <Provider store={store}>
      {ui}
    </Provider>
  );
};

beforeEach(() => {
  jest.clearAllMocks();  // Limpia cualquier mock previo
});

describe('App Component', () => {
  test('Muestra mensaje cuando no hay países disponibles', async () => {
    // Simula una respuesta vacía
    fetchCountryByRegion.mockResolvedValue([]);

    renderWithProviders(<App />);

    await waitFor(() => {
      // Espera que el mensaje "no hay países disponibles" sea visible
      expect(screen.getByText(/no hay países disponibles/i)).toBeInTheDocument();
    });
  });

  test('Muestra mensaje de error si la API falla', async () => {
    // Simula una respuesta con error
    fetchCountryByRegion.mockRejectedValue(new Error('Error al cargar los países'));

    renderWithProviders(<App />);

    await waitFor(() => {
      // Espera que el mensaje de error sea visible
      expect(screen.getByText(/error al cargar los países/i)).toBeInTheDocument();
    });
  });

  test('Muestra la lista de países correctamente', async () => {
    // Simula una respuesta con datos de países
    fetchCountryByRegion.mockResolvedValue([
      { name: { common: 'Argentina' } },
      { name: { common: 'Brasil' } },
    ]);

    renderWithProviders(<App />);

    await waitFor(() => {
      // Espera que los nombres de los países sean visibles
      expect(screen.getByText(/argentina/i)).toBeInTheDocument();
      expect(screen.getByText(/brasil/i)).toBeInTheDocument();
    });
  });
});
