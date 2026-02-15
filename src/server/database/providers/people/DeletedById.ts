import { Knex } from "../../knex/index.js";
import { ETableNames } from "../../ETableNames.js";

export const deleteById = async (id: number): Promise<void | Error> => {
  try {
    const result = await Knex(ETableNames.PEOPLE)
      .where("id", "=", id)
      .del();

    if (result > 0) return;

    return new Error("Person not found");
  } catch (error) {
    console.log(error);
    return new Error("Error deleting person");
  }
};
