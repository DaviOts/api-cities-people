import { IUser } from "../../models/index.js";
import { Knex } from "../../knex/index.js";
import { ETableNames } from "../../ETableNames.js";
import { PasswordCrypto } from "../../../shared/services/index.js";

export const create = async (
  user: Omit<IUser, "id">,
): Promise<number | Error> => {
  try {
    const hashPassword = await PasswordCrypto.hashPassword(user.password);

    const [result] = await Knex(ETableNames.USERS)
      .insert({ ...user, password: hashPassword })
      .returning("id");

    if (typeof result === "object") {
      return result.id;
    } else if (typeof result === "number") {
      return result;
    }
    return new Error("Error to register user");
  } catch (error) {
    if (
      error instanceof Error &&
      error.message.includes("UNIQUE constraint failed")
    ) {
      return new Error("Email already used");
    }
    return new Error("Error to register user");
  }
};
