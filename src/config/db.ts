import { Knex } from "knex";
const knexConfig: Knex.Config = {
  client: "pg",
  connection: process.env.DATABASE_API,
  migrations: {
    tableName: "initial_table",
    directory: "../../migrations"
  },
  searchPath: ["public"], // schema
  seeds: {
    directory: "../../seeds"
  },
  pool: {
    min: 2,
    max: 10
  }
};

export default knexConfig;
