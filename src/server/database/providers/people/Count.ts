import { Knex } from "../../knex/index.js";
import { ETableNames } from "../../ETableNames.js";

export const count = async (filter = ""): Promise<number | Error> => {
  try {
    const [{ count }] = (await Knex(ETableNames.PEOPLE)
      .where("name", "like", `%${filter}%`)
      .count<[{ count: number }]>("* as count")) as unknown as [{ count: number }];

    if (Number.isInteger(Number(count))) return Number(count);

    return new Error("Error counting people");
  } catch (error) {
    console.log(error);
    return new Error("Error counting people");
  }
};
