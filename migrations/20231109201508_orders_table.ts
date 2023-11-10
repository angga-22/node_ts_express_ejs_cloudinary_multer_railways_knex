import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("orders", (table) => {
    table.increments("id").primary();
    table.string("userEmail");
    table.string("status");
    table.integer("carId");
    table.integer("rentPrice");
    table.timestamp("startRent");
    table.timestamp("finishRent");
    table.timestamp("createdAt");
    table.timestamp("updatedAt");
  });
}

export async function down(knex: Knex): Promise<void> {}
