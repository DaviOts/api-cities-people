import { Knex } from "../../knex/index.js";
import { ETableNames } from "../../ETableNames.js";
import { ICity } from "../../models/City.js";

export const updateById = async (
  id: number,
  city: Omit<ICity, "id">,
): Promise<void | Error> => {
  try {
    const result = await Knex(ETableNames.CITIES)
      .update(city)
      .where("id", "=", id);

    if (result > 0) return;

    return new Error("City not found");
  } catch (error) {
    console.log(error);
    return new Error("Error updating city");
  }
};
