import React from 'react';
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { MemoryRouter } from "react-router-dom";
import Home from "../pages/Home";
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

describe("Home Component", () => {
  let store;

  // Limpiar mocks antes de cada prueba y resetear mocks para evitar problemas
  beforeEach(() => {
    jest.clearAllMocks();   // Limpiar mocks
    jest.resetAllMocks();   // Resetear mocks si es necesario
    store = configureMockStore(); // Reiniciar el store antes de cada prueba
  });

  afterEach(() => {
    jest.clearAllMocks();  // Limpiar mocks al finalizar cada prueba
    jest.resetAllMocks();  // Resetear mocks al finalizar cada prueba
  });

  test("renders home component with countries", async () => {
    // Configurar el store con datos iniciales para esta prueba
    store = configureMockStore({
      countries: {
        countries: [
          { name: { common: "Argentina" }, cca3: "ARG", flags: { svg: "arg.svg" } },
          { name: { common: "Brasil" }, cca3: "BRA", flags: { svg: "bra.svg" } },
        ],
        status: "succeeded",
        error: null,
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </Provider>
    );

    // Verificaciones
    expect(screen.getByText("Busca un país...")).toBeInTheDocument();
    expect(screen.getByAltText("Bandera de Argentina")).toBeInTheDocument();
    expect(screen.getByAltText("Bandera de Brasil")).toBeInTheDocument();
  });

  test("renders loading state", async () => {
    // Configurar el store con estado de carga
    store = configureMockStore({
      countries: {
        countries: [],
        status: "loading",
        error: null,
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText("Cargando países...")).toBeInTheDocument();
  });

  test("renders error state", async () => {
    // Configurar el store con estado de error
    store = configureMockStore({
      countries: {
        countries: [],
        status: "failed",
        error: "Error de red",
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText("Error al cargar los países: Error de red")).toBeInTheDocument();
  });

  test("search functionality filters countries", async () => {
    // Configurar el store con países para filtrar
    store = configureMockStore({
      countries: {
        countries: [
          { name: { common: "Argentina" }, cca3: "ARG", flags: { svg: "arg.svg" } },
          { name: { common: "Brasil" }, cca3: "BRA", flags: { svg: "bra.svg" } },
        ],
        status: "succeeded",
        error: null,
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </Provider>
    );

    const searchInput = screen.getByPlaceholderText("Busca un país...");
    fireEvent.change(searchInput, { target: { value: "Arg" } });

    // Verificaciones después del filtrado
    await waitFor(() => {
      expect(screen.getByText("Argentina")).toBeInTheDocument();
      expect(screen.queryByText("Brasil")).not.toBeInTheDocument();
    });
  });

  test("navigation to about page works", async () => {
    // Configurar el store con datos iniciales
    store = configureMockStore({
      countries: {
        countries: [],
        status: "succeeded",
        error: null,
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </Provider>
    );

    const aboutLink = screen.getByText("Acerca de");
    expect(aboutLink.closest("a")).toHaveAttribute("href", "/about");
  });

  test("country cards are clickable", async () => {
    // Configurar el store con países
    store = configureMockStore({
      countries: {
        countries: [
          { name: { common: "Argentina" }, cca3: "ARG", flags: { svg: "arg.svg" } },
        ],
        status: "succeeded",
        error: null,
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </Provider>
    );

    const argentinaCard = screen.getByAltText("Bandera de Argentina");
    expect(argentinaCard.closest("a")).toHaveAttribute("href", "/country/ARG");
  });

  test("renders empty state when no countries match search", async () => {
    // Configurar el store con países
    store = configureMockStore({
      countries: {
        countries: [
          { name: { common: "Argentina" }, cca3: "ARG", flags: { svg: "arg.svg" } },
        ],
        status: "succeeded",
        error: null,
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </Provider>
    );

    const searchInput = screen.getByPlaceholderText("Busca un país...");
    fireEvent.change(searchInput, { target: { value: "X" } });

    await waitFor(() => {
      expect(screen.getByText("No se encontraron países.")).toBeInTheDocument();
    });
  });
});
