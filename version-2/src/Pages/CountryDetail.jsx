import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

export default function CountryDetail({ getCountriesData, countries }) {
  // get this country's name from the URL parameter
  const countryName = useParams().countryName;

  const country = countries.find((countryObject) => {
    return countryObject.name.common === countryName;
  });
  // setting the useState for visitcount
  const [countryView, setCountryView] = useState(0);

  // active use state for the save button heart
  // const [activeSaveBtn, setactiveSaveBtn] = useState(" ");

  function clickHandler(countryName) {
    // Get the saved countries list from localStorage with exsisting names or without any exisisting names.
    let savedCountries = JSON.parse(localStorage.getItem("countryNames")) || [];

    // Add the new country to the array of strings using the key countryName
    savedCountries.push(countryName);

    // Save the updated array back into localStorage
    localStorage.setItem("countryNames", JSON.stringify(savedCountries));
  }
  useEffect(() => {
    if (!country) return; // do nothing if not found yet

    // get the "countryViews" string from localStorage
    const countryViewLocal = localStorage.getItem("countryViews");

    // if nothing is there, start with an empty object
    let savedViewCounts;
    if (countryViewLocal) {
      savedViewCounts = JSON.parse(countryViewLocal);
    } else {
      savedViewCounts = {};
    }

    // 1. look up this country’s current count (or 0 if missing)
    let current = 0;
    if (savedViewCounts[country.name.common]) {
      current = savedViewCounts[country.name.common];
    }

    // 2. add one
    const newViewCount = current + 1;

    // 3. update the object with the new count
    savedViewCounts[country.name.common] = newViewCount;

    // 4. save it back to localStorage
    localStorage.setItem("countryViews", JSON.stringify(savedViewCounts));

    // step 3: update React state
    setViewCount(newViewCount);
  }, [country]);

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
