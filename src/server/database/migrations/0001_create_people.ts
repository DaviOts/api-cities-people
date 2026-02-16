import { Knex } from "knex";
import { ETableNames } from "../ETableNames.js";

export async function up(knex: Knex): Promise<void> {
  await knex.schema
    .createTable(ETableNames.PEOPLE, (table) => {
      table.bigIncrements("id").primary().index();
      table.string("name").index().notNullable();
      table.string("email").index().unique().notNullable();
      table
        .bigInteger("cityId")
        .references("id")
        .inTable(ETableNames.CITIES)
        .onDelete("RESTRICT")
        .onUpdate("CASCADE")
        .notNullable()
        .index();

      table.comment("Table of people");
    })
    .then(() => console.log(`Created table ${ETableNames.PEOPLE}`));
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema
    .dropTable(ETableNames.PEOPLE)
    .then(() => console.log(`Dropped table ${ETableNames.PEOPLE}`));
}
