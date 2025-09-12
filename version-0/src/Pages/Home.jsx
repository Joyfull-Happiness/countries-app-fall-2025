import localData from "../../localData.js";
import CountryDetail from "./CountryDetail.jsx";
import CountryCard from "./CountryCard.jsx";
import { Link } from "react-router-dom";

// import SavedCountries from "./SavedCountries.jsx";
import React, { useState } from "react";

export default function Home({}) {
  const sortedCountries = [...localData].sort((a, b) =>
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
