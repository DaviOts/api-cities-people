import { Knex } from "knex";
import { ETableNames } from "../ETableNames.js";

export const seed = async (knex: Knex) => {
  const [result] = await knex(ETableNames.CITIES).count<[{ count: number }]>(
    "* as count",
  );

  if (Number.isInteger(result?.count) && Number(result?.count) > 0) return;

  const citiesToInsert = citiesOfMG.map((NameCity) => ({ name: NameCity }));

  await knex(ETableNames.CITIES).insert(citiesToInsert);
};

const citiesOfMG = [
  "Abadia dos Dourados",
  "Abaeté",
  "Abre Campo",
  "Acaiaca",
  "Açucena",
  "Água Boa",
  "Água Comprida",
  "Aguanil",
  "Águas Formosas",
  "Águas Vermelhas",
  "Aimorés",
  "Aiuruoca",
  "Alagoa",
  "Albertina",
  "Além Paraíba",
  "Alfenas",
  "Alfredo Vasconcelos",
  "Almenara",
  "Alpercata",
  "Alpinópolis",
  "Alterosa",
  "Alto Caparaó",
  "Alto Jequitibá",
  "Alto Rio Doce",
  "Alvarenga",
  "Alvinópolis",
  "Alvorada de Minas",
  "Amparo do Serra",
];
