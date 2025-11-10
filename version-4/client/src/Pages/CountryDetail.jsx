import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

export default function CountryDetail({ getCountriesData, countries = [] }) {
  // get the country's name from the URL
  const { countryName } = useParams();

  // visit count state
  const [countryView, setCountryView] = useState(0);

  // below i am setting the usestate of the saved button to false so it can show a gray heart
  const [saveBtn, setSaveBtn] = useState(false);

  // find the matching country object
  const country = countries.find(
    (countryObject) => countryObject.name.common === countryName
  );
  // Step 1: Declare a new function called saveOneCountry() which should send a POST request to the POST request to the https://backend-answer-keys.onrender.com/save-one-country (save-one-conuntry is the end point ) on the country details page
  const saveOneCountry = async () => {
    // when we call the fetch() function, we only need to pass in the API url as one parameter when it's a GET request
    // but hen we need to make a POST request, we have to pass in a second parameter: an object
    await fetch("/api/save-one-country", {
      method: "POST", // we need to say we're sending a POST request because by default it's always a GET request
      headers: {
        // the headers is where we put metadata about our request, includeing the data type that we pass in the body
        // in this case we are saying we're  passing in JSON data in the body
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        country_name: country.name.common,
      }),
    });
  };
  // Step 2: Call the saveOneCountry() function on click when the save country heart button is clicked (useState)
  // save button: store list of saved names in localStorage
  function clickHandler() {
    saveOneCountry();

    setSaveBtn(true); // once clicked, set to saved
  }

  // count views for this country

  const updateOneCountryCounter = async () => {
    // when we call the fetch() function, we only need to pass in the API url as one parameter when it's a GET request
    // but hen we need to make a POST request, we have to pass in a second parameter: an object

    const response = await fetch("/api/update-one-country-count", {
      method: "POST", // we need to say we're sending a POST request because by default it's always a GET request
      headers: {
        // the header is where we put metadata about our request, including the data type that we pass in the body

        "Content-Type": "application/json",
      },
      // in this case we are saying we're  passing in JSON data of country_name in the body and stringifying it
      body: JSON.stringify({ country_name: country.name.common }),
    });

    // wer're taking the data from the response and turning it into useable js (parsing the string) and passing in the count property from the data into the CountryView
    const dataCounter = await response.json();
    setCountryView(dataCounter.count);
  };

  useEffect(() => {
    // if there is a country call on the updateOneCountryCounter function the run on page load
    if (country) {
      updateOneCountryCounter();
    }
  }, [country]);

  // Below is fixing the flag bug, without it my page won't render
  if (!country) {
    return (
      <main className="detail-page">
        <p>Loading…</p>
        <Link className="back-btn" to="/">
          ← Back
        </Link>
      </main>
    );
  }

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
                {saveBtn ? "❤️" : "🩶"}
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
