import React, { useState, useEffect } from "react";

export default function SavedCountries() {
  const emptyFormState = { fullName: "", email: "", country: "", bio: "" };
  // this holds the current state of the form inputs
  const [formData, setFormData] = useState(emptyFormState);
  // this holds the user's profile information, if a user previously submitted the form
  const [userInfo, setUserInfo] = useState(null);

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
    /* below is an alternative way of doing it VVVV
    
    let stringified = JSON.stringify(formData)
    localStorage.setItem('profile', stringified) )*/

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

  // make another if useeffect for saved countries where the information from the local storage is getting saved into the variable countriesLocalData wh
  useEffect(() => {
    const countriesLocalData =
      JSON.parse(localStorage.getItem("countryNames")) || [];
    setSavedCountries(countriesLocalData);
  }, []);

  return (
    <>
      <main className="page">
        <section className="section">
          <h2>My Saved Countries</h2>
          <div className="saved-list">
            {/* static placeholder cards or empty state */}
            <div>{savedCountries.join(", ")}.</div>
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
