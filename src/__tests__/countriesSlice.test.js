import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { Counter } from "../Counter";
import {
  decrement,
  increment,
  incrementByAmount,
  incrementAsync,
  incrementIfOdd,
} from "../counterSlice";

const mockStore = configureStore([]);

describe("Counter Component", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      counter: { value: 0 },
    });
    store.dispatch = jest.fn();
  });

  test("Renderiza el contador correctamente", () => {
    render(
      <Provider store={store}>
        <Counter />
      </Provider>
    );

    expect(screen.getByText("0")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /decrement value/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /increment value/i })).toBeInTheDocument();
  });

  test("Incrementa el contador cuando se hace clic en +", () => {
    render(
      <Provider store={store}>
        <Counter />
      </Provider>
    );

    const incrementButton = screen.getByRole("button", { name: /increment value/i });
    fireEvent.click(incrementButton);

    expect(store.dispatch).toHaveBeenCalledWith(increment());
  });

  test("Decrementa el contador cuando se hace clic en -", () => {
    render(
      <Provider store={store}>
        <Counter />
      </Provider>
    );

    const decrementButton = screen.getByRole("button", { name: /decrement value/i });
    fireEvent.click(decrementButton);

    expect(store.dispatch).toHaveBeenCalledWith(decrement());
  });

  test("Modifica el input y ejecuta incrementByAmount correctamente", () => {
    render(
      <Provider store={store}>
        <Counter />
      </Provider>
    );

    const input = screen.getByLabelText("Set increment amount");
    fireEvent.change(input, { target: { value: "5" } });

    const addAmountButton = screen.getByText("Add Amount");
    fireEvent.click(addAmountButton);

    expect(store.dispatch).toHaveBeenCalledWith(incrementByAmount(5));
  });

  test("Ejecuta incrementAsync correctamente", () => {
    render(
      <Provider store={store}>
        <Counter />
      </Provider>
    );

    const input = screen.getByLabelText("Set increment amount");
    fireEvent.change(input, { target: { value: "3" } });

    const asyncButton = screen.getByText("Add Async");
    fireEvent.click(asyncButton);

    expect(store.dispatch).toHaveBeenCalledWith(incrementAsync(3));
  });

  test("Ejecuta incrementIfOdd correctamente", () => {
    render(
      <Provider store={store}>
        <Counter />
      </Provider>
    );

    const input = screen.getByLabelText("Set increment amount");
    fireEvent.change(input, { target: { value: "7" } });

    const oddButton = screen.getByText("Add If Odd");
    fireEvent.click(oddButton);

    expect(store.dispatch).toHaveBeenCalledWith(incrementIfOdd(7));
  });
});
