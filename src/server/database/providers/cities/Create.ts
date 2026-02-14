import { ICity } from "../../models/index.js";
import { Knex } from "../../knex/index.js";
import { ETableNames } from "../../ETableNames.js";

export const create = async (
  city: Omit<ICity, 'id'>,
): Promise<number | Error> => {
  try {
    const [result] = await Knex(ETableNames.CITIES).insert(city).returning('id');

    if (typeof result === 'object') {
      return result.id;
    } else if (typeof result === 'number') {
      return result;
    }
    return new Error('Error to register city');
  } catch (error) {
    console.log(error);
    return new Error('Error to register city');
  }
};
