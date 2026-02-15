import { IPerson } from "../../models/index.js";
import { Knex } from "../../knex/index.js";
import { ETableNames } from "../../ETableNames.js";

export const create = async (
  person: Omit<IPerson, "id">,
): Promise<number | Error> => {
  try {
    const [{ count }] = (await Knex(ETableNames.CITIES)
      .where("id", "=", person.cityId)
      .count<[{ count: number }]>("* as count")) as unknown as [
      { count: number },
    ];

    if (count === 0) {
      return new Error("City not found");
    }

    const [result] = await Knex(ETableNames.PEOPLE)
      .insert(person)
      .returning("id");

    if (typeof result === "object") {
      return result.id;
    } else if (typeof result === "number") {
      return result;
    }
    return new Error("Error to register person");
  } catch (error) {
    console.log(error);
    return new Error("Error to register person");
  }
};
