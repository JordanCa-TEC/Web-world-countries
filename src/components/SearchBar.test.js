import '@testing-library/jest-dom';
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SearchBar from "./SearchBar";

describe("SearchBar Component", () => {
  test("Renderiza correctamente con placeholder", () => {
    render(<SearchBar />);
    
    const inputElement = screen.getByPlaceholderText("Buscar país...");
    expect(inputElement).toBeInTheDocument();
  });

  test("Cambia el valor cuando el usuario escribe", () => {
    const mockOnChange = jest.fn();
    render(<SearchBar value="" onChange={mockOnChange} />);

    const inputElement = screen.getByPlaceholderText("Buscar país...");
    fireEvent.change(inputElement, { target: { value: "Argentina" } });

    expect(mockOnChange).toHaveBeenCalledTimes(1);
    expect(mockOnChange).toHaveBeenCalledWith("Argentina");
  });
});
