import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CountryDetails from "./pages/CountryDetails";
import CountryAbout from "./pages/CountryAbout";
import Footer from "./components/footer"

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/country/:code" element={<CountryDetails />} />
      <Route path="/about" element={<CountryAbout />} />
    </Routes>
    <Footer></Footer>
  </BrowserRouter>
);

export default App;
