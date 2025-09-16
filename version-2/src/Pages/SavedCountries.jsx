import React from "react";

export default function SavedCountries() {
  return (
    <>
      <main className="page">
        <section className="section">
          <h2>My Saved Countries</h2>
          <div className="saved-list">
            {/* static placeholder cards or empty state */}
            <p>No countries saved yet.</p>
          </div>
        </section>

        <section className="section">
          <h2>My Profile</h2>
          <form className="profile-form" onSubmit={(e) => e.preventDefault()}>
            <div className="form-group">
              <label htmlFor="fullName" className="sr-only">
                Full Name
              </label>
              <input id="fullName" type="text" placeholder="Full Name" />
            </div>

            <div className="form-group">
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <input id="email" type="email" placeholder="Email" />
            </div>

            <div className="form-group">
              <label htmlFor="country" className="sr-only">
                Country
              </label>
              <input id="country" type="text" placeholder="Country" />
            </div>

            <div className="form-group">
              <label htmlFor="bio" className="sr-only">
                Bio
              </label>
              <textarea id="bio" rows="6" placeholder="Bio" />
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
