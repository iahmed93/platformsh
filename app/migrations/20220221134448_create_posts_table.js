exports.up = function (knex, Promise) {
  return knex.schema.createTable("posts", function (table) {
    table.increments("id").primary();
    table.string("title").notNullable();
    table
      .dateTime("created_at")
      .notNullable()
      .defaultTo(knex.raw("CURRENT_TIMESTAMP"));
    table.string("content");

    table.charset("utf8mb4");
    table.collate("utf8mb4_bin");
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable("posts");
};
