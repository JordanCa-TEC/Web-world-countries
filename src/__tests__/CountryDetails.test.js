import { configureStore } from "@reduxjs/toolkit";
import React from 'react';
import { render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter, useParams } from "react-router-dom";
import CountryDetails from "../pages/CountryDetails";
import countriesSlice from "../redux/slices/countriesSlice";

// Configuración del store para las pruebas
const configureMockStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      countries: countriesSlice.reducer,
    },
    preloadedState: initialState,
  });
};

// Mockear useParams
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: jest.fn(),
}));

describe("CountryDetails Component", () => {
  let store;

  beforeEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  test("renders loading state", async () => {
    try {
      // Configurar el store con estado de carga
      store = configureMockStore({
        countries: {
          countryDetails: null,
          status: "loading",
          error: null,
        },
      });

      // Mockear useParams para retornar un código de país
      useParams.mockImplementation(() => ({ code: "ARG" }));

      const { unmount } = render(
        <Provider store={store}>
          <MemoryRouter>
            <CountryDetails />
          </MemoryRouter>
        </Provider>
      );

      // Verificación del estado de carga
      expect(screen.getByText("Cargando información del país...")).toBeInTheDocument();

      // Limpia el componente después de la prueba
      unmount();
    } catch (error) {
      console.error("Error en la prueba de estado de carga:", error);
      throw error;
    }
  });

  test("renders error state", async () => {
    try {
      // Configurar el store con estado de error
      store = configureMockStore({
        countries: {
          countryDetails: null,
          status: "failed",
          error: "Error al cargar los datos",
        },
      });

      useParams.mockImplementation(() => ({ code: "ARG" }));

      const { unmount } = render(
        <Provider store={store}>
          <MemoryRouter>
            <CountryDetails />
          </MemoryRouter>
        </Provider>
      );

      // Verificación del estado de error
      expect(screen.getByText("Error al cargar la información: Error al cargar los datos")).toBeInTheDocument();

      unmount();
    } catch (error) {
      console.error("Error en la prueba de estado de error:", error);
      throw error;
    }
  });

  test("renders no data found state", async () => {
    try {
      // Configurar el store con estado exitoso pero sin datos
      store = configureMockStore({
        countries: {
          countryDetails: null,
          status: "succeeded",
          error: null,
        },
      });

      useParams.mockImplementation(() => ({ code: "ARG" }));

      const { unmount } = render(
        <Provider store={store}>
          <MemoryRouter>
            <CountryDetails />
          </MemoryRouter>
        </Provider>
      );

      // Verificación del estado sin datos
      expect(screen.getByText("No se encontró información para este país.")).toBeInTheDocument();

      unmount();
    } catch (error) {
      console.error("Error en la prueba de estado sin datos:", error);
      throw error;
    }
  });

  test("renders country details when data is available", async () => {
    try {
      // Configurar el store con datos del país
      store = configureMockStore({
        countries: {
          countryDetails: {
            name: { common: "Argentina" },
            flags: { svg: "arg.svg" },
            area: 2780000,
            population: 45000000,
            timezones: ["America/Argentina/Buenos_Aires"],
            capital: ["Buenos Aires"],
            region: "Americas",
            languages: { spa: "Español" },
            currencies: { ARS: { name: "Peso argentino" } },
          },
          status: "succeeded",
          error: null,
        },
      });

      useParams.mockImplementation(() => ({ code: "ARG" }));

      const { unmount } = render(
        <Provider store={store}>
          <MemoryRouter>
            <CountryDetails />
          </MemoryRouter>
        </Provider>
      );

      // Verificaciones de los datos del país
      await waitFor(() => {
        expect(screen.getByText("Argentina")).toBeInTheDocument();
        expect(screen.getByAltText("Bandera de Argentina")).toBeInTheDocument();
        expect(screen.getByText("Área: 2780000 km²")).toBeInTheDocument();
        expect(screen.getByText("Población: 45000000")).toBeInTheDocument();
        expect(screen.getByText("Huso horario: America/Argentina/Buenos_Aires")).toBeInTheDocument();
        expect(screen.getByText("Capital: Buenos Aires")).toBeInTheDocument();
        expect(screen.getByText("Región: Americas")).toBeInTheDocument();
        expect(screen.getByText("Idiomas: Español")).toBeInTheDocument();
        expect(screen.getByText("Monedas: Peso argentino")).toBeInTheDocument();
      });

      unmount();
    } catch (error) {
      console.error("Error en la prueba de detalles del país:", error);
      throw error;
    }
  });
});