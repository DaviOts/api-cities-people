import type { Request, Response } from "express";
import * as yup from "yup";
import { StatusCodes } from "http-status-codes";
import { peopleProvider } from "../../database/providers/people/index.js";

import { validation } from "../../shared/middleware/index.js";
import { IPerson } from "../../database/models/index.js";

export interface IBodyProps extends Omit<IPerson, "id"> {}

export const createValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(
    yup.object().shape({
      name: yup.string().required().min(3),
      email: yup.string().required().email(),
      cityId: yup.number().required().moreThan(0),
    }),
  ),
}));

export const create = async (
  req: Request<{}, {}, IBodyProps>,
  res: Response,
) => {
  const result = await peopleProvider.create(req.body);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message,
      },
    });
  }

  return res.status(StatusCodes.CREATED).json(result);
};
