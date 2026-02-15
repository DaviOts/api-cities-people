import { Knex } from "../../knex/index.js";
import { ETableNames } from "../../ETableNames.js";
import { IPerson } from "../../models/index.js";

export const getAll = async (
  page: number,
  limit: number,
  filter: string,
): Promise<IPerson[] | Error> => {
  try {
    const result = await Knex(ETableNames.PEOPLE)
      .select("*")
      .where("name", "like", `%${filter}%`)
      .offset((page - 1) * limit)
      .limit(limit);

    if (result) return result;

    return new Error("People not found");
  } catch (error) {
    console.log(error);
    return new Error("Error getting people");
  }
};
