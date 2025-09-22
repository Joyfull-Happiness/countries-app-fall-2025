import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

export default function CountryDetail({ getCountriesData, countries }) {
  // get this country's name from the URL parameter
  const countryName = useParams().countryName;

  // setting the useState for visitcount
  const [countryView, setCountryView] = useState(0);

  function clickHandler(countryName) {
    // Get the saved countries list from localStorage with exsisting names or without any exisisting names.
    let savedCountries = JSON.parse(localStorage.getItem("countryNames")) || [];

    // Add the new country to the array of strings using the key countryName
    savedCountries.push(countryName);

    // Save the updated array back into localStorage
    localStorage.setItem("countryNames", JSON.stringify(savedCountries));

    useEffect(() => {
      // this is going to count the number of times the country is visited.

      const viewCountsFromLocalStorage =
        JSON.parse(localStorage.getItem("countryViews")) || {};
      const newViewCounts = (viewCountsLocalStorage[country] || 0) + 1;
      viewCountsLocalStorage[country] = newCount;
      localStorage.setItem(
        "countryViews",
        JSON.stringify(viewCountsFromLocalStorage)
      );
      setCountryView(newCount);
    });
  }

  const country = countries.find((countryObject) => {
    return countryObject.name.common === countryName;
  });

  return (
    <>
      <main className="detail-page">
        <div>
          <Link className="back-btn" to="/">
            ← Back
          </Link>
        </div>

        <div className="detail-container">
          <div className="detail-flag-container">
            <img
              className="detail-flag"
              src={country.flags?.png || country.flags?.svg}
              alt={`${country.name?.common} flag`}
            />
          </div>
          <div className="detail-countryInfo">
            <h2>{country.name?.common}</h2>
            <div>
              {/* click handler function and input country name */}
              <button
                onClick={() => clickHandler(country.name.common)}
                className="save-btn"
              >
                Save
              </button>
            </div>
            <p>
              <strong>Population:</strong>{" "}
              {country.population.toLocaleString("en-US")}
            </p>
            <p>
              <strong>Region:</strong> {country.region}
            </p>
            <p>
              <strong>Capital:</strong> {country.capital}
            </p>
            <p>
              <strong>Visits:</strong> {countryView}
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
