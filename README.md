# 📝 Countries App

## 📌 This project is a simple, user-friendly tool that helps people explore and track countries from around the world. Users can search the global country database, filter results by region or category, and quickly find countries through a responsive keyword search. By creating an account, users can save country cards they want to revisit and access their own personalized Saved Countries page. The purpose of this project is to make discovering global information easy, organized, and accessible. Whether someone is planning travel, studying geography, or just exploring the world, this tool keeps everything in one place and allows users to build their own collection of countries that matter to them.

## 🚀 Live Site

Check out the app: https://lajoies-countries-app-version-5.netlify.app/

## 🖼️ Screenshots

<img width="1485" height="848" alt="Screenshot 2025-12-08 at 10 57 54 AM" src="https://github.com/user-attachments/assets/eb74c43a-4ad8-4880-9526-47c6630b92b6" />

<img width="1485" height="845" alt="Screenshot 2025-12-08 at 10 58 14 AM" src="https://github.com/user-attachments/assets/442ad0f3-4ba4-4419-a105-78b19da1a89f" />

<img width="1488" height="845" alt="Screenshot 2025-12-08 at 10 58 20 AM" src="https://github.com/user-attachments/assets/20cfa4d9-c94b-4180-a4f4-fd2e35f0b8a3" />


## ✨ Features

This is what you can do on the app:

- \*\*\* Search for any country using the global country database.

- \*\*\* Save a country card you want to keep track of.

- \*\*\* Sign up / log in to access your personalized Saved Countries page.

- \*\*\* Filter countries by region or category.

- \*\*\* Search countries by name with a responsive keyword search.

## 🛠️ Tech Stack

**Frontend**

- **Languages:** HTML, CSS, JavaScript
- **Framework:** React, Vite
- **Deployment:** Netlify

**Server/API**

- **Languages:** JavaScript, JSON, SQL
- **Framework:** Node.js + Express
- **Deployment:** Render

**Database**

- **Languages:** SQL
- **Deployment:** Neon (PostgreSQL)

## 🔹 API Documentation

These are the API endpoints I built:

1. \*\*\* GET /get-newest-user

2. \*\*\* GET /get-all-users

3. \*\*\* POST /add-one-user

4. \*\*\* GET /get-all-saved-countries

5. \*\*\* POST /save-one-country

6. \*\*\* POST /unsave-one-country

7. \*\*\* POST /unsave-all-countries

8. \*\*\* POST /update-one-country-count

Learn more about the API endpoints here: _**https://github.com/Joyfull-Happiness/countries-app-fall-2025/blob/main/version-5/pseudo-code.txt**_

## 🗄️ Database Schema

Here's the SQL I used to create my tables:

```sql
-- Users table stores basic profile information
CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  name VARCHAR NOT NULL,
  country_name VARCHAR NOT NULL,
  email VARCHAR NOT NULL,
  bio VARCHAR NOT NULL
);

-- Saved countries table stores user-saved country cards
CREATE TABLE saved_countries (
  saved_country_id SERIAL PRIMARY KEY,
  country_name VARCHAR NOT NULL UNIQUE
);

-- Country counts table tracks how many times a country is saved
CREATE TABLE country_counts (
  country_count_id SERIAL PRIMARY KEY,
  country_name VARCHAR NOT NULL UNIQUE,
  count INTEGER NOT NULL
);
```

## 💭 Reflections

**What I learned:** How to build a full-stack workflow from database to frontend, how API routes connect each layer, and how to manage data flow using SQL, Express, and React.\*\*

**What I'm proud of:** Building a functioning end-to-end app with user accounts, saved data, and dynamic filtering — and solving real debugging issues along the way.\*\*

**What challenged me:** Handling JSON responses correctly and debugging SQL constraints.\*\*

**Future ideas for how I'd continue building this project:**

1. \*\*\* Add authentication with hashed passwords and user-specific saved countries.
2. \*\*\*Create a more detailed country profile page with maps and cultural data.
3. \*\*\* Add pagination, search suggestions, and improved UI animations for smoother UX.

## 🙌 Credits & Shoutouts

Thanks to **Arainna Bakari and Makiba ** for Helping me power thorugh alll those debugging marathons**!
And thanks to Xavier for being my go-to when I had CSS trouble**!
