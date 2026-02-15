import { Knex } from "../../knex/index.js";
import { ETableNames } from "../../ETableNames.js";
import { IPerson } from "../../models/index.js";

export const updateById = async (
  id: number,
  person: Omit<IPerson, "id">,
): Promise<void | Error> => {
  try {
    const [{ count }] = (await Knex(ETableNames.CITIES)
      .where("id", "=", person.cityId)
      .count<[{ count: number }]>("* as count")) as unknown as [
      { count: number },
    ];

    if (count === 0) {
      return new Error("City not found");
    }

    const result = await Knex(ETableNames.PEOPLE)
      .update(person)
      .where("id", "=", id);

    if (result > 0) return;

    return new Error("Person not found");
  } catch (error) {
    console.log(error);
    return new Error("Error updating person");
  }
};
