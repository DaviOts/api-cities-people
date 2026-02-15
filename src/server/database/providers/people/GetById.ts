import { Knex } from "../../knex/index.js";
import { ETableNames } from "../../ETableNames.js";
import { IPerson } from "../../models/index.js";

export const getById = async (id: number): Promise<IPerson | Error> => {
  try {
    const result = await Knex(ETableNames.PEOPLE)
      .select("*")
      .where("id", "=", id)
      .first();

    if (result) return result;

    return new Error("Person not found");
  } catch (error) {
    console.log(error);
    return new Error("Error getting person");
  }
};
