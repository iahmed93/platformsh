const express = require("express");
const { Model } = require("objection");
let knex;

const config = require("platformsh-config").config();

const port = config.port || 3000;

const credentials = config.credentials("mysql_db");

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

Model.knex(knex);

class Person extends Model {
  static get tableName() {
    return "persons";
  }

  static get relationMappings() {
    return {
      children: {
        relation: Model.HasManyRelation,
        modelClass: Person,
        join: {
          from: "persons.id",
          to: "persons.parentId",
        },
      },
    };
  }
}

const app = express();

app.get("/", (req, res) => {
  res.send("Hello Platform.sh!" + credentials.path);
});

app.post("/person", async (req, res) => {
  const firstName = req.body.name;
  const person = await Person.query().insert({
    firstName,
  });
  console.log("created:", person);
  res.send("Person Created");
});

app.get("/person", async (req, res) => {
  const person = await Person.query();
  res.json(person);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
