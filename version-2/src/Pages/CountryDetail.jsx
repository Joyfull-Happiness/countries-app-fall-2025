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

  // save button: store list of saved names in localStorage
  // add the name of the country to the array.
  function clickHandler(nameToSave) {
    let savedCountries = JSON.parse(localStorage.getItem("countryNames")) || [];
    // Add the new country to the array of strings using the key countryName
    savedCountries.push(countryName);

    // Save the updated array back into localStorage
    localStorage.setItem("countryNames", JSON.stringify(savedCountries));

    setSaveBtn(true); // once clicked, set to saved
  }

  // count views for this country

  useEffect(() => {
    if (!country) return;

    // this looks inside localStorage for the key "countryViews".
    // if it exists, it comes back as a string with the country name and number
    const countyViewInitial = localStorage.getItem("countryViews");
    // this is an if conditional that says if the countyViewInitial exsists then turn that string into an object
    // if nothing was saved then have it show as null.
    let savedViewCounts = countyViewInitial
      ? JSON.parse(countyViewInitial)
      : {};

    //  it’s not really an object, reset it to an empty object
    if (!savedViewCounts) {
      savedViewCounts = {};
    }

    // here i am storing the initital view count of 0 to the variable current
    // then i am setting up the variable newViewCount and storing the currentViews and adding one to it (on website load due to useeffect)
    const currentViews = savedViewCounts[country.name.common] || 0;
    const newViewCount = currentViews + 1;

    // below i am updating the viewcount
    savedViewCounts[country.name.common] = newViewCount;
    localStorage.setItem("countryViews", JSON.stringify(savedViewCounts));

    setCountryView(newViewCount);
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
