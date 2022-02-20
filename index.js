const express = require("express");
// const { Model } = require("objection");
// const log = require("simple-node-logger").createSimpleLogger("logs.log");

const config = require("platformsh-config").config();

const port = config.port || 3000;

const credentials = config.credentials("mysql_db");

// const knex = require("knex")({
//   client: "mysql",
//   connection: {
//     host: credentials.host,
//     port: credentials.port,
//     user: credentials.username,
//     password: credentials.password,
//     database: credentials.path,
//   },
// });

// Model.knex(knex);

const app = express();

app.get("/", (req, res) => {
  res.send("Hello Platform.sh! " + credentials.password);
});

app.get("/test", (req, res) => {
  res.send("Test Platform.sh!");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
  // log.info(`Listening on port ${port}`);
});
