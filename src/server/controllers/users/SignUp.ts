import type { Request, Response } from "express";
import * as yup from "yup";
import { StatusCodes } from "http-status-codes";
import { usersProvider } from "../../database/providers/users/index.js";

import { validation } from "../../shared/middleware/index.js";
import { IUser } from "../../database/models/index.js";


export interface IBodyProps extends Omit<IUser, "id"> {}

export const signUpValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(
    yup.object().shape({
      name: yup.string().required().min(3),
      email: yup.string().required().email().min(5),
      password: yup.string().required().min(6),
    }),
  ),
}));

export const signUp = async (
  req: Request<{}, {}, IBodyProps>,
  res: Response,
) => {
  const result = await usersProvider.create(req.body);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message,
      },
    });
  }

  return res.status(StatusCodes.CREATED).json(result);
};
