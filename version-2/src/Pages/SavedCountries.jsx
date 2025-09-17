import React, { useState, useEffect } from "react";

export default function SavedCountries({ countries }) {
  const emptyFormState = { fullName: "", email: "", country: "", bio: "" };
  // this holds the current state of the form inputs
  const [formData, setFormData] = useState(emptyFormState);
  // this holds the user's profile information, if a user previously submitted the form
  const [userInfo, setUserInfo] = useState(null);
  // here i am creating a usestate to hold the saved countries list
  const [savedCountries, setSavedCountries] = useState([]);
  // the variable needed to display the country to the user via usestate
  const [matchedCountry, setMatchedCountry] = useState(null);

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
  useEffect(() => {
    if (localStorage.getItem("profile")) {
      let profileDeStringified = JSON.parse(localStorage.getItem("profile"));
      setUserInfo(profileDeStringified);
    }
  }, []);

  // run this once the page loads
  useEffect(() => {
    // here we are puting saved Countries into a variable and storing the local storage conutryNames inside of it
    const countriesLocalData =
      JSON.parse(localStorage.getItem("countryNames")) || [];
    // below i am looping through each of the countries names saved locally and givin the if condition that if they match the country name from the API then display it to the usuer
    setSavedCountries(countriesLocalData);

    countriesLocalData.forEach((savedCountry) => {
      if (savedCountry === country.name.common) {
        setMatchedCountry(savedCountry);
      }
    });
  }, []);

  {
    /* Step 1: make if statement to see if countries has value 
    if it does you want to 
    Step2: 
    
    
    */
  }

  return (
    <>
      <main className="page">
        <section className="section">
          <h2>My Saved Countries</h2>
          <div className="saved-list">
            {/* static placeholder cards or empty state */}
            <div>
              <h2>{country.name.common}</h2>
              <CountryCard key={country.name?.common} country={country} />
            </div>
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
