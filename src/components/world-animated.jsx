import React, { useState, useEffect } from "react";

const GiferEmbed = () => {
  const [maxWidth, setMaxWidth] = useState("100vw");
  const [paddingTop, setPaddingTop] = useState("75%");

  useEffect(() => {
    const updateStyles = () => {
      if (window.innerWidth <= 768) {
        setMaxWidth("75vw"); // Tamaño para móviles
        setPaddingTop("75%"); // Ajuste para móviles
      } else {
        setMaxWidth("35vw"); // Tamaño para escritorio
        setPaddingTop("25%"); // Valor original para escritorio
      }
    };

    updateStyles(); // Llamar una vez para inicializar el estado correctamente
    window.addEventListener("resize", updateStyles);

    return () => {
      window.removeEventListener("resize", updateStyles);
    };
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        padding: "10px",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: maxWidth, // Controlado dinámicamente
          paddingTop: paddingTop, // Controlado dinámicamente
        }}
      >
        <iframe
          title="world"
          src="https://gifer.com/embed/2rRT"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            border: "none",
          }}
          frameBorder="0"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default GiferEmbed;
