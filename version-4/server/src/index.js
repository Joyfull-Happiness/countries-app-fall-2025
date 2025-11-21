/*
/* --------------------------------
Server/API for Countries App Version 4

DB Fiddle Link: ______________
----------------------------------*/

/*----------------------------------
Boilerplate Code to Set Up Server
----------------------------------*/

// importing Node Modules
import express from "express";
import pg from "pg"; // pg stands for PostgreSQL, for connecting to the database
import config from "./config.js"; // importing the connection string to our database hosted on Neon

//connecting to our PostgreSQL database, or db for short
const db = new pg.Pool({
  // new pg.Pool() creates a connection to the database
  connectionString: config.databaseUrl, // credentials to access the database. Keep private!
  ssl: true, // use SSL encryption when connecting to the database to keep data safe
});

const app = express(); // create an instance of the Express module, which gives us access to all of Express's functions, methods, useful superpowers

app.use(express.json()); // This server will receive and respond to requests with JSON data

const port = 3000; // Setting which port to listen or receive requests

app.listen(port, () => {
  console.log(`Server is listening on port ${port}!`);
});
/*----------------------------------
Helper Functions (Test them in postman)
----------------------------------*/

//-------------------------------------
//📊 USERS Helper Functions
//-------------------------------------

// 1. *GET /get-newest-user
async function getNewestUser() {
  // db.query() lets us query the SQL database
  // It takes in one parameter: a SQL query!
  const data = await db.query(
    "SELECT * FROM users ORDER BY user_id DESC LIMIT 1"
  );
  return data.rows; // we have to use dot notation to get value of the rows property from the data object
}

//2. *GET /get-all-users
async function getAllUsers() {
  const data = await db.query("SELECT * FROM users ORDER BY user_id ASC");
  return data.rows;
}

// //3. *POST /add-one-user
// async function addOneUser(name, country_name, email, bio) {
//   await db.query(
//     "INSERT INTO users (name, country_name, email, bio) VALUES ($1, $2, $3, $4)",
//     [name, country_name, email, bio]
//   );
// }

//-------------------------------------
//📊 SAVED COUNTRIES
//-------------------------------------

//1. *GET /get-all-saved-countries
async function getAllSavedCountries() {
  const data = await db.query("SELECT * FROM saved_countries");
  return data.rows;
}
//2. *POST /save-one-country
async function saveOneCountry(country_name) {
  await db.query(
    "INSERT INTO saved_countries (country_name) VALUES ($1) ON CONFLICT (country_name) DO NOTHING RETURNING *",
    [country_name]
  );
}

// //3. POST /unsave-one-country
// async function unsaveOneCountry(country_name) {
//   await db.query("DELETE FROM saved_countries WHERE country_name = $1", [
//     country_name,
//   ]);
// }

// //4. POST /unsave-all-countries
// async function unsaveAllCountries() {
//   await db.query("DELETE FROM saved_countries");
// }

//-------------------------------------
//📊 COUNTRY COUNTS
//-------------------------------------

//1. COUNTRY COUNTS
async function updateOneCountryCount(country_name) {
  const updatedCountryCount = await db.query(
    "INSERT INTO country_counts (country_name, count) VALUES ($1, 1) ON CONFLICT (country_name) DO UPDATE SET count = country_counts.count + 1 RETURNING *",
    [country_name]
  );
  return updatedCountryCount.rows[0];
}

/*----------------------------------
API Endpoints
----------------------------------*/

//-------------------------------------
//📊 USERS
//-------------------------------------

// 1. *GET /get-newest-user

app.get("/get-newest-user", async (req, res) => {
  const newestUser = await getNewestUser();
  res.json(newestUser);
});

//2. *GET /get-all-users
app.get("/get-all-users", async (req, res) => {
  const allUsers = await getAllUsers();
  res.json(allUsers);
});

//3. *POST /add-one-user
app.post("/add-one-user", async (req, res) => {
  const { name, country_name, email, bio } = req.body;
  await addOneUser(name, country_name, email, bio);
  res.send(`Success! A User was added.`);
});

//-------------------------------------
//📊 SAVED COUNTRIES
//-------------------------------------

//1. *GET /get-all-saved-countries

app.get("/get-all-saved-countries", async (req, res) => {
  console.log("DATA_TEST:");

  const allCountries = await getAllSavedCountries();

  res.json(allCountries);
});

//2. *POST /save-one-country
app.post("/save-one-country", async (req, res) => {
  const { country_name } = req.body;
  await saveOneCountry(country_name);

  res.send(`Success! ${country_name} was saved.`);
});

//3. *POST /unsave-one-country
app.post("/unsave-one-country", async (req, res) => {
  const { country_name } = req.body;
  await unsaveOneCountry(country_name);

  res.send(`Success! ${country_name} was unsaved.`);
});

// //4. POST /unsave-all-countries
// app.post("/unsave-all-countries", async (req, res) => {
//   await unsaveAllCountries();
//   res.send("Success! All countries were unsaved.");
// });
//-------------------------------------
//📊 COUNTRY COUNTS
//-------------------------------------

//1. POST /update-one-country-count

// This comment explains that the next line defines a POST route for updating a country's count
// This comment explains that the next line extracts country_name from the request body and renames it to countryName
// This comment explains that the next line calls the helper function to update the count in the database
// This comment explains that the next line sends the updated count back to the frontend as JSON

app.post("/update-one-country-count", async (request, response) => {
  const { country_name } = request.body;
  const updatedCountry = await updateOneCountryCount(country_name);
  //error handling add const= updated count

  response.json({
    message: "Success! Country count was updated.",
    count: updatedCountry.count, // frontend now has access to data.count
  });
});
/* 
app.post("/update-one-animal-name-with-error-handling", async (req, res) => {
  try {
    // Possible errors:
    // DONE: 400 Bad Request: what should we do when there's no body?
    // 500 Internal Server Error: when a unique constraint is violated
    // 404 Resource Not Found: using camelCase for the api endpoint
    // 404 Resource Not Found: no existing animal was found with the given id

    const { country_name, count } = req.body;

    // check for missing required fields in the request body: id and newName
    if (!country_name || !count) {
      // return error message with 400 Bad Request status code, because the request was badly formed with wrong syntax.
      // All 4xx status codes are client-side errors, which means the client sent a bad request
      return res.status(400).send("Error: Missing required fields");
    }

    await updateOneAnimalName(country_name, count);

    res.send(`Success! ${country_name}'s count was updated.`);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});
*/
