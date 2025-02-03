// --- src/pages/About.jsx ---
import React from "react";
import GiferEmbed from "../components/world-animated"

const About = () => {
  return (
    <div className="about-page">
      <div className="about-texto">
      <h1>WorldSeek Parte de un trabajo en Equipo</h1>
      <p>
        Bienvenido a nuestra página. Somos una empresa comprometida con ofrecer
        información relevante sobre países y su geografía.
        Nuestra misión es proporcionar a nuestros usuarios una plataforma
        interactiva para explorar información detallada sobre cualquier país del
        mundo.
      </p>
      <p>
        Nuestra plataforma es fácil de usar y proporciona datos confiables sobre
        una variedad de temas relacionados con los países. Nos apasiona compartir 
        el conocimiento y facilitar el acceso a información precisa y actualizada.
      </p>
      <p>
        A medida que el mundo continúa evolucionando, nosotros también
        evolucionamos. Nuestra visión es expandir nuestros servicios y ofrecer
        herramientas más interactivas para que los usuarios puedan aprender y
        explorar de una manera divertida y educativa.
      </p>
      <p>
        ¡Gracias por visitar nuestra página y esperamos que disfrutes de tu
        experiencia explorando el mundo con nosotros!
      </p>
      </div>
      <GiferEmbed />
    </div>
  );
};

export default About;
