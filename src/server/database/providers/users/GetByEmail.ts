import { Knex } from "../../knex/index.js";
import { ETableNames } from "../../ETableNames.js";
import { IUser } from "../../models/User.js";

export const getByEmail = async (email: string): Promise<IUser | Error> => {
  try {
    const result = await Knex(ETableNames.USERS)
      .select("*")
      .where("email", "=", email)
      .first();

    if (result) return result;

    return new Error("User not found");
  } catch (error) {
    console.log(error);
    return new Error("Error getting user");
  }
};
