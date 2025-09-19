import React, { useState, useEffect } from "react";
import CountryCard from "./CountryCard";

export default function SavedCountries({ countries }) {
  const emptyFormState = { fullName: "", email: "", country: "", bio: "" };
  // this holds the current state of the form inputs
  const [formData, setFormData] = useState(emptyFormState);
  // this holds the user's profile information, if a user previously submitted the form
  const [userInfo, setUserInfo] = useState("");
  // here i am creating a usestate to hold the saved countries list
  const [savedCountries, setSavedCountries] = useState([]);

  // Update the state when input values change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData, "form was submitted");

    localStorage.setItem("profile", JSON.stringify(formData));

    setUserInfo(formData);
    // reset the form to empty state
    setFormData(emptyFormState);
  };
  // console.log("userInfo", userInfo);
  // run this once the page loads
  useEffect(() => {
    if (localStorage.getItem("profile")) {
      let profileDeStringified = JSON.parse(localStorage.getItem("profile"));

      // console.log("profileDeStringified", profileDeStringified);
      setUserInfo(profileDeStringified);
    }

    // here we are puting saved Countries into a variable and storing the local storage conutryNames inside of it
    let countriesLocalData = JSON.parse(localStorage.getItem("countryName"));
    // below we are passing through the countriesLocalData to setSavedCountries is a function that changes the veraible countriesLocalData so that we can use it to be displayed

    setSavedCountries(countries);

    // below i am saying for each country listed in the local countries data if the saved country matches an exsisting country set the savecheck to true for the country
    // const savedCountriesSorted = countriesLocalData.forEach((savedCountry) => {
    //   if (savedCountry === country.name.common) {
    //     // it's going to set the setSaveChecked state to true
    //   }
    // });
  }, []);
  // };

  return (
    <>
      <main className="page">
        <section className="section">
          <h2>My Saved Countries</h2>
          <div className="saved-list">
            if (savedCountry === country.name.common)
            {<CountryCard key={country.name?.common} country={country} />}
          </div>
        </section>
        {userInfo && <h2>Welcome {userInfo.fullName}!</h2>}
        <section className="section">
          <h2>My Profile</h2>
          <form className="profile-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                name="fullName"
                className="sr-only"
                value={formData.fullName}
                onChange={handleInputChange}
                id="fullName"
                type="text"
                placeholder="Full Name"
              />
            </div>

            <div className="form-group">
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <input
                id="country"
                name="country"
                type="text"
                placeholder="Country"
                value={formData.country}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <textarea
                type="text"
                id="bio"
                name="bio"
                rows="6"
                placeholder="Bio"
                value={formData.bio}
                onChange={handleInputChange}
              />
            </div>

            <button type="submit" className="button">
              Submit
            </button>
          </form>
        </section>
      </main>
    </>
  );
}
