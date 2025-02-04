import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCountryDetails } from "../redux/slices/countriesSlice";
import { useParams } from "react-router-dom";
import "../styles/details.scss"

const CountryDetails = () => {
  const { code } = useParams();
  const dispatch = useDispatch();
  
  // Accedemos al estado del país seleccionado y su estado de carga
  const { countryDetails, status, error } = useSelector((state) => state.countries);

  useEffect(() => {
    if (code) {
      dispatch(fetchCountryDetails(code)); // Cargar detalles del país
    }
  }, [dispatch, code]);

  if (status === "loading") return <p>Cargando información del país...</p>;
  if (status === "failed") return <p>Error al cargar la información: {error}</p>;
  if (!countryDetails) return <p>No se encontró información para este país.</p>;

  console.log("Detalles del país:", countryDetails); // Depuración

  // Desestructuramos los datos del país para su visualización
  const {
    name,
    flags,
    area,
    population,
    timezones,
    capital,
    region,
    languages,
    currencies,
  } = countryDetails;

  const googleMapUrl = `https://www.google.com/maps?q=${encodeURIComponent(name?.common)}&output=embed`;

  return (
    <div className="country-details">
      <h1>{name?.common || "Nombre no disponible"}</h1>
      <img src={flags?.png || flags?.svg || ""} alt={`Bandera de ${name?.common || "desconocido"}`} />
      <p><strong>Área:</strong> {area ? `${area} km²` : "N/A"}</p>
      <p><strong>Población:</strong> {population || "N/A"}</p>
      <p><strong>Huso horario:</strong> {timezones?.join(", ") || "N/A"}</p>
      <p><strong>Capital:</strong> {capital?.join(", ") || "N/A"}</p>
      <p><strong>Región:</strong> {region || "N/A"}</p>
      <p><strong>Idiomas:</strong> {languages ? Object.values(languages).join(", ") : "N/A"}</p>
      <p><strong>Monedas:</strong> {currencies ? Object.values(currencies).map((c) => c.name).join(", ") : "N/A"}</p>

      {/* Mapa sin API */}
      <div className="map-container">
        <iframe
          src={`https://www.google.com/maps?q=${name?.common}&output=embed`}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
};

export default CountryDetails;

