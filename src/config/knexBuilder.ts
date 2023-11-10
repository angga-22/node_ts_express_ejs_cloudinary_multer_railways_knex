import knex from "knex";

export const knexBuilder = knex({
  client: "pg",
  connection: process.env.DATABASE_API,
  searchPath: ["public"]
});
