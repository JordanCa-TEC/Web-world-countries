import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import {
  fetchCountryByName,
  fetchCountryByCode,
  fetchCountryByCurrency,
  fetchCountryByLanguage,
} from '../api/countriesAPI';

describe('API Client Tests', () => {
  let mock;

  beforeAll(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.reset();
  });

  afterAll(() => {
    mock.restore();
  });

  test('fetchCountryByName - debe retornar datos del país', async () => {
    const mockData = [{ name: { common: 'Mexico' }, cca3: 'MEX' }];
    mock.onGet('/name/Mexico').reply(200, mockData);

    const response = await fetchCountryByName('Mexico');
    expect(response).toEqual(mockData);
  });

  test('fetchCountryByCode - debe retornar datos del país por código', async () => {
    const mockData = { name: { common: 'United States' }, cca3: 'USA' };
    mock.onGet('/alpha/USA').reply(200, mockData);

    const response = await fetchCountryByCode('USA');
    expect(response).toEqual(mockData);
  });

  test('fetchCountryByCurrency - debe retornar países con la moneda especificada', async () => {
    const mockData = [{ name: { common: 'Argentina' }, currencies: { ARS: {} } }];
    mock.onGet('/currency/ARS').reply(200, mockData);

    const response = await fetchCountryByCurrency('ARS');
    expect(response).toEqual(mockData);
  });

  test('fetchCountryByLanguage - debe retornar países que hablan el idioma especificado', async () => {
    const mockData = [{ name: { common: 'Spain' }, languages: { spa: 'Spanish' } }];
    mock.onGet('/lang/spa').reply(200, mockData);

    const response = await fetchCountryByLanguage('spa');
    expect(response).toEqual(mockData);
  });

  test('fetchCountryByName - debe manejar errores correctamente', async () => {
    mock.onGet('/name/InvalidCountry').reply(404, { message: 'Not Found' });

    await expect(fetchCountryByName('InvalidCountry')).rejects.toThrow('Not Found');
  });
});
