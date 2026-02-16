import type { Request, Response } from "express";
import * as yup from "yup";
import { StatusCodes } from "http-status-codes";
import { usersProvider } from "../../database/providers/users/index.js";

import { validation } from "../../shared/middleware/index.js";
import { IUser } from "../../database/models/index.js";

import { PasswordCrypto, JWTService } from "../../shared/services/index.js";

export interface IBodyProps extends Omit<IUser, "id" | "name"> {}

export const signInValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(
    yup.object().shape({
      email: yup.string().required().email().min(5),
      password: yup.string().required().min(6),
    }),
  ),
}));

export const signIn = async (
  req: Request<{}, {}, IBodyProps>,
  res: Response,
) => {
  const { email, password } = req.body;

  const user = await usersProvider.getByEmail(email);

  if (user instanceof Error) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      errors: {
        default: "Email or password incorrect",
      },
    });
  }

  const passwordMatch = await PasswordCrypto.verifyPassword(
    password,
    user.password,
  );

  if (!passwordMatch) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      errors: {
        default: "Email or password incorrect",
      },
    });
  } else {
    const accessToken = JWTService.sign({ uid: user.id });
    if (accessToken === 'JWT_SECRET_NOT_FOUND') {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        errors: {
          default: "error to generate token",
        },
      });
    }
    return res.status(StatusCodes.OK).json({ accessToken });
  }
};
