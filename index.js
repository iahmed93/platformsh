const express = require("express");
const { Model } = require("objection");
let knex;

const config = require("platformsh-config").config();

const port = config.port || 3000;

const credentials = config.credentials("database");

try {
  knex = require("knex")({
    client: "mysql",
    connection: {
      host: credentials.host,
      port: credentials.port,
      user: credentials.username,
      password: credentials.password,
      database: credentials.path,
    },
  });
} catch (error) {
  console.error(error);
}

// Model.knex(knex);

const app = express();

app.get("/", (req, res) => {
  res.send("Hello Platform.sh!" + credentials.path);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
