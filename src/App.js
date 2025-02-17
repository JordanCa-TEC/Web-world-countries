import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import CountryDetails from "./pages/CountryDetails.jsx";
import CountryAbout from "./pages/CountryAbout.jsx";
import Footer from "./components/footer.jsx";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/country/:code" element={<CountryDetails />} />
      <Route path="/about" element={<CountryAbout />} />
    </Routes>
    <Footer />
  </BrowserRouter>
);

export default App;
