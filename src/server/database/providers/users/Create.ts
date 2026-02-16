import { IUser } from "../../models/index.js";
import { Knex } from "../../knex/index.js";
import { ETableNames } from "../../ETableNames.js";

export const create = async (
  user: Omit<IUser, "id">,
): Promise<number | Error> => {
  try {
    const [result] = await Knex(ETableNames.USERS).insert(user).returning("id");

    if (typeof result === "object") {
      return result.id;
    } else if (typeof result === "number") {
      return result;
    }
    return new Error("Error to register user");
  } catch (error) {
    console.log(error);
    return new Error("Error to register user");
  }
};
