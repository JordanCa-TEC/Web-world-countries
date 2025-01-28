// --- src/pages/CountryDetails.jsx ---
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCountryByCode } from "../redux/slices/countriesSlice";  // Acción ajustada
import { useParams } from "react-router-dom";

const CountryDetails = () => {
  const { code } = useParams();
  const dispatch = useDispatch();
  
  // Accedemos al estado de countryDetails
  const { countryDetails, status, error } = useSelector((state) => state.countries);

  useEffect(() => {
    dispatch(fetchCountryByCode(code)); // Llamamos a la acción con el código del país
  }, [dispatch, code]);

  // Si el estado es 'loading', mostramos un mensaje de carga
  if (status === 'loading') return <p>Cargando información del país...</p>;

  // Si ocurrió un error, mostramos el mensaje de error
  if (status === 'failed') return <p>Error al cargar la información: {error}</p>;

  // Si no hay datos del país, no renderizamos nada
  if (!countryDetails) return <p>No se encontró información para este país.</p>;

  // Desestructuramos los datos del país para su visualización
  const {
    name,
    flag,
    area,
    population,
    timezone,
    capital,
    region,
    languages,
    currencies,
  } = countryDetails;

  return (
    <div className="country-details">
      <h1>{name}</h1>
      <img src={flag} alt={`Bandera de ${name}`} />
      <p><strong>Área:</strong> {area} km²</p>
      <p><strong>Población:</strong> {population}</p>
      <p><strong>Huso horario:</strong> {timezone}</p>
      <p><strong>Capital:</strong> {capital}</p>
      <p><strong>Región:</strong> {region}</p>
      <p><strong>Idiomas:</strong> {languages?.join(", ")}</p>
      <p><strong>Monedas:</strong> {currencies?.map((currency) => currency.name).join(", ")}</p>
    </div>
  );
};

export default CountryDetails;
