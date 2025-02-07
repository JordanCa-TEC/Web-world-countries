import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import configureStore from "redux-mock-store";
import CountryDetails from "../pages/CountryDetails";

// Crear un mock de Redux
const mockStore = configureStore([]);

describe("CountryDetails Component", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      countries: {
        countryDetails: {
          name: { common: "Argentina" },
          flags: { png: "https://flagcdn.com/w320/ar.png" },
          area: 2780400,
          population: 45376763,
          timezones: ["UTC-03:00"],
          capital: ["Buenos Aires"],
          region: "América del Sur",
          languages: { spa: "Español" },
          currencies: { ARS: { name: "Peso argentino" } },
        },
        status: "succeeded",
        error: null,
      },
    });
    store.dispatch = jest.fn();
  });

  test("Muestra el mensaje de carga cuando está cargando", () => {
    store = mockStore({ countries: { status: "loading" } });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/country/ARG"]}>
          <Routes>
            <Route path="/country/:code" element={<CountryDetails />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText("Cargando información del país...")).toBeInTheDocument();
  });

  test("Muestra un mensaje de error si falla la carga", () => {
    store = mockStore({ countries: { status: "failed", error: "Error al cargar" } });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/country/ARG"]}>
          <Routes>
            <Route path="/country/:code" element={<CountryDetails />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText("Error al cargar la información: Error al cargar")).toBeInTheDocument();
  });

  test("Renderiza correctamente los detalles del país", () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/country/ARG"]}>
          <Routes>
            <Route path="/country/:code" element={<CountryDetails />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText("Argentina")).toBeInTheDocument();
    expect(screen.getByText("Área: 2780400 km²")).toBeInTheDocument();
    expect(screen.getByText("Población: 45376763")).toBeInTheDocument();
    expect(screen.getByText("Huso horario: UTC-03:00")).toBeInTheDocument();
    expect(screen.getByText("Capital: Buenos Aires")).toBeInTheDocument();
    expect(screen.getByText("Región: América del Sur")).toBeInTheDocument();
    expect(screen.getByText("Idiomas: Español")).toBeInTheDocument();
    expect(screen.getByText("Monedas: Peso argentino")).toBeInTheDocument();
  });
});
