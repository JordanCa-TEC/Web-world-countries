// --- src/pages/CountryDetails.jsx ---
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadCountryDetails } from "../redux/slices/countriesSlice";
import { useParams, Link } from "react-router-dom";

const CountryDetails = () => {
  const { code } = useParams();
  const dispatch = useDispatch();
  const { selectedCountry } = useSelector((state) => state.countries);

  useEffect(() => {
    dispatch(loadCountryDetails(code));
  }, [dispatch, code]);

  if (!selectedCountry) return <p>Cargando información del país...</p>;

  return (
    <div className="country-details">
      <h1>{selectedCountry.name}</h1>
      <img src={selectedCountry.flag} alt={selectedCountry.name} />
      <p>Área: {selectedCountry.area} km²</p>
      <p>Huso horario: {selectedCountry.timezone}</p>
      <p>Población: {selectedCountry.population}</p>
      <Link to={`/country/${code}/risk`}>Ver nivel de riesgo</Link>
    </div>
  );
};

export default CountryDetails;