import { Routes, Route, Link, BrowserRouter } from "react-router-dom";
import Home from "./Pages/Home.jsx";
import SavedCountries from "./Pages/SavedCountries.jsx";
// import localData from "../../localData.js";

// import CountryDetail from "./CountryDetail.jsx";

function App() {
  return (
    <>
      <header className="header">
        <Link to="/" className="homeHeader-link">
          Where in the world?
        </Link>

        <Link to="/SavedCountries" className="savedCountries-link">
          Saved Countries
        </Link>
      </header>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/SavedCountries" element={<SavedCountries />} />
          {/* <Route path="/CountryDetail" element={<CountryDetail />} /> */}
        </Routes>
      </div>
    </>
  );
}

export default App;
