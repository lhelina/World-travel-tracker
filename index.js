import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import dotenv from "dotenv";
dotenv.config();

const db = new pg.Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

const app = express();
const port = 3000;
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

async function check_visited() {
  const result = await db.query("SELECT country_code FROM visited_countries");
  let countries = [];
  result.rows.forEach((country) => {
    countries.push(country.country_code);
  });
  return countries;
}

app.get("/", async (req, res) => {
  const countries = await check_visited();
  res.render("index.ejs", { countries: countries, total: countries.length });
});

app.post("/add", async (req, res) => {
  const new_country = req.body.country;
  try {
    const result = await db.query(
      "SELECT country_code FROM countries WHERE LOWER(country_name) LIKE '%' || $1 || '%';",
      [new_country.toLowerCase()]
    );

    const data = result.rows[0];
    const countrycode = data.country_code;
    try {
      await db.query(
        "insert into visited_countries(country_code) values ($1)",
        [countrycode]
      );
      res.redirect("/");
    } catch (error) {
      console.error("error");
      const countries = await check_visited();

      res.render("index.ejs", {
        countries: countries,
        total: countries.length,
        error: "country already visited",
      });
    }
  } catch (error) {
    console.error("error");
    const countries = await check_visited();
    res.render("index.ejs", {
      countries: countries,
      total: countries.length,
      error: "country name doesn't exist ",
    });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
