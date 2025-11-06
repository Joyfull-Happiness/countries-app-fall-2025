import localData from "../../localData.js";
import CountryDetail from "./CountryDetail.jsx";
import CountryCard from "./CountryCard.jsx";
import SavedCountries from "./SavedCountries.jsx";
import { Link } from "react-router-dom";
import React, { useState } from "react";

export default function Home({ countries }) {
  // Here i am sorting the countries by the "common" name in alphabetical order
  const sortedCountries = countries.sort((firstCountry, secondCountry) =>
    firstCountry.name.common > secondCountry.name.common ? 1 : -1
  );

  return (
    <>
      <div className="card-container">
        {/* Below i am looping through the sortedCountries array and displaying a CountryCard for each one */}
        {sortedCountries.map((country) => (
          // I am making a key for each CountryCard using the country’s common name
          <CountryCard key={country.name?.common} country={country} />
        ))}
      </div>
    </>
  );
}
