// Importamos todos los tests de la carpeta __tests__
import './apiClient.test.js';
import './Counter.test.js';
import './countriesSlice.test.js';
import './CountryDetails.test.js';
import './Home.test.js';
import './SearchBar.test.js';

// Mensaje para indicar que `app.test.js` está ejecutando los demás tests
describe('Organización de pruebas', () => {
  test('Ejecutando todas las pruebas de la aplicación', () => {
    expect(true).toBe(true); // Dummy test para que Jest no marque error por no haber pruebas aquí.
  });
});
