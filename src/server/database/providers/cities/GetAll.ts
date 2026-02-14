import { Knex } from "../../knex/index.js";
import { ETableNames } from "../../ETableNames.js";
import { ICity } from "../../models/City.js";

export const getAll = async (
  page: number,
  limit: number,
  filter: string,
): Promise<ICity[] | Error> => {
  try {
    const result = await Knex(ETableNames.CITIES)
      .select("*")
      .where("name", "like", `%${filter}%`)
      .offset((page - 1) * limit)
      .limit(limit);

    if (result) return result;

    return new Error("Cities not found");
  } catch (error) {
    console.log(error);
    return new Error("Error getting cities");
  }
};
