import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { MemoryRouter } from "react-router-dom";
import Home from "../pages/Home";

const mockStore = configureStore([]);

describe("Home Component", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      countries: {
        countries: [
          { name: { common: "Argentina" }, cca3: "ARG", flags: { svg: "arg.svg" } },
          { name: { common: "Brasil" }, cca3: "BRA", flags: { svg: "bra.svg" } },
        ],
        status: "succeeded",
        error: null,
      },
    });
  });

  test("renderiza correctamente", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText("Busca un país...")).toBeInTheDocument();
  });

  test("muestra mensaje de carga cuando está en estado 'loading'", () => {
    store = mockStore({
      countries: { countries: [], status: "loading", error: null },
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

  test("muestra mensaje de error cuando falla la carga", () => {
    store = mockStore({
      countries: { countries: [], status: "failed", error: "Error de red" },
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

  test("filtra correctamente los países", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </Provider>
    );

    const input = screen.getByPlaceholderText("Busca un país...");
    fireEvent.change(input, { target: { value: "Arg" } });
    expect(screen.getByText("Argentina")).toBeInTheDocument();
    expect(screen.queryByText("Brasil")).not.toBeInTheDocument();
  });
});
