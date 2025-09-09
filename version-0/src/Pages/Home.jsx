import localData from "../../localData.js";
import CountryDetail from "./CountryDetail.jsx";
import CountryCard from "./CountryCard.jsx";
// import SavedCountries from "./SavedCountries.jsx";
import React, { useState } from "react";

export default function Home({}) {
  const sortedCountries = [...localData].sort((a, b) =>
    a.name.common.localeCompare(b.name.common)
  );
  return (
    <>
      <header className="header">
        <a href="/Home" className="homeHeader-link">
          Where in the world?
        </a>
        <a href="/SavedCountries" className="savedCountries-link">
          Saved Countries
        </a>
      </header>
      <div className="card-container">
        <div>
          {sortedCountries.map((country) => (
            <CountryCard
              key={country.cca3 || country.cca2 || country.name?.common}
              country={country}
            />
          ))}
        </div>
      </div>
    </>
  );
}
