import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CountryDetails from "./pages/CountryDetails";
import CountryRisk from "./pages/CountryRisk";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/country/:code" element={<CountryDetails />} />
      <Route path="/country/:code/risk" element={<CountryRisk />} />
    </Routes>
  </BrowserRouter>
);

export default App;

