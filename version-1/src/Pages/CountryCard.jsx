import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function CountryCard({ country }) {
  const title = country?.name?.common || "Unknown";
  const flagUrl = country?.flags?.png || country?.flags?.svg || "";
  const population = country?.population ?? 0;
  const region = country?.region || "—";
  /*this is displaying different ways of gathering the countries capitol as some countries have multiple capitols
it's saying if hte capitol is an array, string or there is nothing display them
  */
  const capital = Array.isArray(country?.capital)
    ? country.capital[0] || "—"
    : country?.capital || "—";

  return (
    <Link className="all-links" to={`/country-detail/${country.name.common}`}>
      <div className="CountryCard">
        <article className="card">
          <img className="card-flag" src={flagUrl} alt={`${title} flag`} />
          <div className="card-body">
            <h3 className="card-title">{title}</h3>
            <p>
              <strong>Population:</strong> {population}
            </p>
            <p>
              <strong>Region:</strong> {region}
            </p>
            <p>
              <strong>Capital:</strong> {capital}
            </p>
          </div>
        </article>
      </div>
    </Link>
  );
}
