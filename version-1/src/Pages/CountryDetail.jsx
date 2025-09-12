import { useParams, Link } from "react-router-dom";

export default function CountryDetail({ getCountriesData, countries }) {
  // get this country's name from the URL parameter
  const countryName = useParams().countryName;

  const country = countries.find((countryObject) => {
    return countryObject.name.common === countryName;
  });

  if (!country) {
    return (
      <main className="page">
        <p>Loading…</p>
        <button onClick={getCountriesData}>Refresh</button>
      </main>
    );
  }

  return (
    <>
      <main className="detail-page">
        <Link className="back-btn" to="/">
          ← Back
        </Link>

        <div className="detail-layout">
          <img
            className="detail-flag"
            src={country.flags?.png || country.flags?.svg}
            alt={`${country.name?.common} flag`}
          />

          <h2 className="detail-title">{country.name?.common}</h2>
          <p>
            <strong>Population:</strong>{" "}
            {country.population.toLocaleString("en-US")}
          </p>
          <p>
            <strong>Region:</strong> {country.region}
          </p>
          <p>
            <strong>Capital:</strong>{" "}
            {Array.isArray(country.capital)
              ? country.capital[0]
              : country.capital || "—"}
          </p>
        </div>
      </main>
    </>
  );
}
