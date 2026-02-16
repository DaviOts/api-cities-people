import * as SignUp from "./SignUp.js";
import * as SignIn from "./SignIn.js";

export class UsersController {
  public signUp = SignUp.signUp;
  public signIn = SignIn.signIn;
  public signUpValidation = SignUp.signUpValidation;
  public signInValidation = SignIn.signInValidation;
}

export const usersController = new UsersController();
