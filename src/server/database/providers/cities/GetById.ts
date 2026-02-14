import { Knex } from "../../knex/index.js";
import { ETableNames } from "../../ETableNames.js";
import { ICity } from "../../models/City.js";

export const getById = async (id: number): Promise<ICity | Error> => {
  try {
    const result = await Knex(ETableNames.CITIES)
      .select("*")
      .where("id", "=", id)
      .first();

    if (result) return result;

    return new Error("City not found");
  } catch (error) {
    console.log(error);
    return new Error("Error getting city");
  }
};
