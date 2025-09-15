import { Routes, Route, Link, BrowserRouter } from "react-router-dom";
import Home from "./Pages/Home.jsx";
import SavedCountries from "./Pages/SavedCountries.jsx";
// import localData from "../../localData.js";
import React, { useState, useEffect } from "react";

import CountryDetail from "./Pages/CountryDetail.jsx";

function App() {
  // global variables
  const [countries, setCountries] = useState([]);

  const getCountriesData = async () => {
    try {
      const response = await fetch(
        "https://restcountries.com/v3.1/all?fields=name,flags,population,capital,region,cca3,borders"
      );
      const data = await response.json();
      console.log(data);
      setCountries(data);
    } catch (error) {
      console.log("Error: " + error.message);
    }
  };

  // we run useEffect when the page loads
  // it has an empty dependency array, meaning no dependencies, but we still have to include because it's required useEffect syntax

  useEffect(() => {
    getCountriesData();
  }, []);

  return (
    <div>
      <header>
        <nav>
          <Link to="/" className="homeHeader-link">
            Where in the world?
          </Link>

          <Link to="/SavedCountries" className="savedCountries-link">
            Saved Countries
          </Link>
        </nav>
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/SavedCountries" element={<SavedCountries />} />
        <Route
          path="/country-detail/:countryName"
          element={
            <CountryDetail
              countries={countries}
              getCountriesData={getCountriesData}
            />
          }
        />{" "}
      </Routes>
    </div>
  );
}

export default App;
