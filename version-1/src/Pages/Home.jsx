import localData from "../../localData.js";
import CountryDetail from "./CountryDetail.jsx";
import CountryCard from "./CountryCard.jsx";
import SavedCountries from "./SavedCountries.jsx";
import { Link } from "react-router-dom";
import React, { useState } from "react";

export default function Home({ countries }) {
  const sortedCountries = [...countries].sort((a, b) =>
    a.name.common.localeCompare(b.name.common)
  );
  return (
    <>
      <div className="card-container">
        {sortedCountries.map((country) => (
          <CountryCard
            key={country.cca3 || country.cca2 || country.name?.common}
            country={country}
          />
        ))}
      </div>
    </>
  );
}
