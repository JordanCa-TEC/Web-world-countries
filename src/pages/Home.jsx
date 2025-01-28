// --- src/pages/Home.jsx ---
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadCountries } from "../redux/slices/countriesSlice";
import SearchBar from "../components/SearchBar";
import { Link } from "react-router-dom";
import "../styles/main.scss";

const Home = () => {
  const dispatch = useDispatch();
  const { countries, loading } = useSelector((state) => state.countries);
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(loadCountries());
  }, [dispatch]);

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <p>Cargando países...</p>;

  return (
    <div className="home">
      {/* Barra de búsqueda grande */}
      <div className="search-bar-container">
        <SearchBar
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Busca un país..."
        />
      </div>

      {/* Botones de navegación */}
      <div className="navigation-buttons">
        <Link to="/continents" className="nav-button">
          Continentes
        </Link>
        <Link to="/favorites" className="nav-button">
          Favoritos
        </Link>
        <Link to="/about" className="nav-button">
          Acerca de
        </Link>
      </div>

      {/* Desglose de todas las banderas */}
      <div className="flags-container">
        {filteredCountries.map((country) => (
          <div key={country.cca3} className="flag-card">
            <img
              src={country.flags.svg}
              alt={`Bandera de ${country.name.common}`}
              className="flag-image"
            />
            <p className="country-name">{country.name.common}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
