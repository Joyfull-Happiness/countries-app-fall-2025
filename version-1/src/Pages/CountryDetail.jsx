import { useParams } from "react-router-dom";

export default function CountryDetail({ object, id }) {
  function CountryDetail({ countries }) {
    // get this country's name from the URL parameter
    const countryName = useParams().countryName;
  }

  return (
    <>
      <div className="card">
        <div className="imageHeadderWrapper">
          <img src={object.flags.png} />
          <div>
            <p> {object.population}</p>
            <p> {object.region}</p>
            <p> {object.capitol}</p>
          </div>
        </div>
      </div>
    </>
  );
}
