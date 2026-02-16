import * as create from "./Create.js";
import * as getByEmail from "./GetByEmail.js";


export class UsersProvider {
  public create = create.create;
  public getByEmail = getByEmail.getByEmail;
}

export const usersProvider = new UsersProvider();
