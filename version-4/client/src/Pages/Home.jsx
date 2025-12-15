import localData from "../../localData.js";
import CountryDetail from "./CountryDetail.jsx";
import CountryCard from "./CountryCard.jsx";
import SavedCountries from "./SavedCountries.jsx";
import { Link } from "react-router-dom";
import React, { useState } from "react";

export default function Home({ countries }) {
  //("all") is the INITIAL STATE (initialize) which is an empty string
  const [searchBar, setSearchBar] = useState("");
  const [selectedRegionDropDown, setSelectedRegionDropDown] = useState("all");

  //show countries or if there are no countries show an empty array
  let filteredCountries = countries || [];

  // Filter by search query
  // next i'm checking if the user has typed something in the search bar
  // here we're REASSIGNING i am applying a filter to the filteredCountries array,
  //.filter() Creates a new array containing only countries that match.
  // the callback function runs one time for every single item inside filteredCountries.
  //(country) is the parameter name for the item currently being processed in the array.
  // for each country in the array you need to
  // //1) get the country's common name then convert it to lowercase and
  // then check if it includes the search text and lowercase it again
  if (searchBar) {
    filteredCountries = filteredCountries.filter((country) => {
      return country.name.common
        .toLowerCase()
        .includes(searchBar.toLowerCase());
    });
  }

  // Filter by region
  // here i am filtering by region. the user can click the drop down and see what the countries that are in the selected region.
  if (selectedRegionDropDown !== "all") {
    // apply another filter to the already-filtered countries
    filteredCountries = filteredCountries.filter((country) => {
      return (
        // for each country get the country's region from the API convert it to lowercase and check to see if it exactly matches the slected dropdown option
        country.region === selectedRegionDropDown
      );
    });
    console.log("filteredCountries:", filteredCountries);
  }

  return (
    <>
      {/* Search Bar */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search for a country..."
          value={searchBar}
          //below is setting the use state to what's being inputted into the searchbar state
          //below is called an annonymos function
          //setter function is reassigning the value of the search bar variable 
          onChange={(e) => setSearchBar(e.target.value)}
          className="search-input"
        />
      </div>
      <div className="region-filter">
        <select
          value={selectedRegionDropDown}
          onChange={(e) => setSelectedRegionDropDown(e.target.value)}
        >
          <option value="all">Filter by Region</option>
          <option value="Africa">Africa</option>
          <option value="Americas">Americas</option>
          <option value="Antarctic">Antarctic</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
        </select>
      </div>

      <div className="card-container">
        {/* Below i am looping through with the map funciton the filteredCountries array and displaying a CountryCard for each one */}
        {filteredCountries.map((country) => (
          // I am making a key for each CountryCard using the country’s common name
          //country
          <CountryCard key={country.name?.common} country={country} />
        ))}
      </div>
    </>
  );
}
