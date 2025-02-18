import { render, screen } from "@testing-library/react";
import GiferEmbed from "./world-animated"; // Ruta correcta al componente

describe("GiferEmbed Component", () => {
  test("renders iframe with correct src", () => {
    render(<GiferEmbed />);
    
    // Verifica que el iframe se haya renderizado
    const iframe = screen.getByTitle("world");  // Asegúrate de que el iframe tenga el title "world"
    
    // Verifica que el src del iframe esté presente y correcto usando toHaveProperty
    expect(iframe).toHaveProperty("src", "https://gifer.com/embed/2rRT");
  });
});
