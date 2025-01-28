// --- src/pages/Home.jsx ---
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadCountries } from "../redux/slices/countriesSlice";
import SearchBar from "../components/SearchBar";
import { Link } from "react-router-dom";
import '../styles/main.scss';

const Home = () => {
  const dispatch = useDispatch();
  const { countries, loading } = useSelector((state) => state.countries);
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(loadCountries());
  }, [dispatch]);

  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <p>Cargando países...</p>;

  return (
    <div className="home">
      <SearchBar value={search} onChange={setSearch} />
      <ul className="country-list">
        {filteredCountries.map((country) => (
          <li key={country.code}>
            <Link to={`/country/${country.code}`}>{country.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;