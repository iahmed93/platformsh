// Update with your config settings.

const config = require("platformsh-config").config();
const credentials = config.credentials("mysql_db");

const pool = {
  min: process.env.KNEX_MIN_POOL ?? 2,
  max: process.env.KNEX_MAX_POOL ?? 10,
  acquireTimeoutMillis: process.env.KNEX_TINEOUT ?? 30 * 1000,
};

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: "mysql",
    connection: {
      host: credentials.host || "localhost",
      port: credentials.port || "3036",
      user: credentials.username || "user",
      password: credentials.password || "",
      database: credentials.path || "main",
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: "migrations",
      tableName: "migrations",
    },
  },
};
