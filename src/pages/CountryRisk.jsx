// --- src/pages/CountryRisk.jsx ---
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadCountryRisk } from "../redux/slices/countriesSlice";
import { useParams } from "react-router-dom";

const CountryRisk = () => {
  const { code } = useParams();
  const dispatch = useDispatch();
  const { countryRisk } = useSelector((state) => state.countries);

  useEffect(() => {
    dispatch(loadCountryRisk(code));
  }, [dispatch, code]);

  if (!countryRisk) return <p>Cargando información de riesgo...</p>;

  return (
    <div className="country-risk">
      <h1>Nivel de Riesgo</h1>
      <p>{countryRisk.description}</p>
    </div>
  );
};

export default CountryRisk;