import { Knex } from 'knex';
import { ETableNames } from '../ETableNames.js';

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable(ETableNames.CITIES, table => {
        table.bigIncrements('id').primary().index();
        table.string('name', 150).index().notNullable();

        table.comment('Table of cities');
    }).then(() => console.log(`Created table ${ETableNames.CITIES}`));
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable(ETableNames.CITIES).then(() => console.log(`Dropped table ${ETableNames.CITIES}`));
}