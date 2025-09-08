export default function CountryDetail({ object, id }) {
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
