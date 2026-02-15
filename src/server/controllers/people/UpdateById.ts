import type { Request, Response } from "express";
import * as yup from "yup";
import { StatusCodes } from "http-status-codes";
import { IPerson } from "../../database/models/index.js";
import { validation } from "../../shared/middleware/index.js";
import { peopleProvider } from "../../database/providers/people/index.js";

export interface IParamsProps {
  id?: number;
}

export interface IBodyProps extends Omit<IPerson, "id"> {}

export const updateByIdValidation = validation((getSchema) => ({
  params: getSchema<IParamsProps>(
    yup.object().shape({
      id: yup.number().integer().required().moreThan(0),
    }),
  ),
  body: getSchema<IBodyProps>(
    yup.object().shape({
      name: yup.string().required().min(3),
      email: yup.string().required().email(),
      cityId: yup.number().integer().moreThan(0),
    }),
  ),
}));

export const updateById = async (
  req: Request<IParamsProps, {}, IBodyProps>,
  res: Response,
) => {
  if (!req.params.id) {
    return res.status(StatusCodes.NOT_ACCEPTABLE).json({
      errors: {
        default: "Parameter id is not valid",
      },
    });
  }

  const result = await peopleProvider.updateById(req.params.id, req.body);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message,
      },
    });
  }

  return res.status(StatusCodes.NO_CONTENT).json(result);
};
