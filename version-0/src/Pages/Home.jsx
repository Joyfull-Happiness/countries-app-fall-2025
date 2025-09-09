import localData from "../../localData.js";
import CountryDetail from "./CountryDetail.jsx";
import React, { useState } from "react";

export default function Home({}) {
  return (
    <header className="header">
      <a href="/home" className="homeHeader-link">
        Where in the world?
      </a>
      <a href="/saved" className="savedCountries-link">
        Saved Countries
      </a>
    </header>
  );
}
