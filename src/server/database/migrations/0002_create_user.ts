import { Knex } from "knex";
import { ETableNames } from "../ETableNames.js";

export async function up(knex: Knex): Promise<void> {
  await knex.schema
    .createTable(ETableNames.USERS, (table) => {
      table.bigIncrements("id").primary().index();
      table.string("name").notNullable().checkLength(">=", 3);
      table.string("email").unique().notNullable().checkLength(">=", 5);
      table.string("password").notNullable().checkLength(">=", 6);

      table.comment("Table of users");
    })
    .then(() => console.log(`Created table ${ETableNames.USERS}`));
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema
    .dropTable(ETableNames.USERS)
    .then(() => console.log(`Dropped table ${ETableNames.USERS}`));
}
