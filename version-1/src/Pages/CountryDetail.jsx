import { useParams } from "react-router-dom";

export default function CountryDetail({ getCountriesData, countries }) {
  // get this country's name from the URL parameter
  const countryName = useParams().countryName;

  const getCountryObject = countries.find((countryObject) => {
    return countryObject.name.common === countryName;
  });

  console.log(getCountryObject);

  return (
    <>
      <button onClick={getCountriesData}>Refresh</button>
      {countries.map((c) => (
        <div key={c.cca3}>{c.name.common}</div>
      ))}
      <main className="page">
        <Link className="all-links" to="/">
          ← Back
        </Link>
        <article className="card" style={{ maxWidth: 520 }}>
          <img className="card-flag" src={flagUrl} alt={`${title} flag`} />
          <div className="card-body">
            <h2 className="card-title">{title}</h2>
            <p>
              <strong>Population:</strong> {population}
            </p>
            <p>
              <strong>Region:</strong> {region}
            </p>
            <p>
              <strong>Capital:</strong> {capital}
            </p>
            <p>
              <strong>Neighbors:</strong>{" "}
              {neighborNames.length ? neighborNames.join(", ") : "—"}
            </p>
          </div>
        </article>
      </main>
    </>
  );
}
