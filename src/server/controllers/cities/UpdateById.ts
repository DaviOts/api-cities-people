import type { Request, Response } from "express";
import * as yup from "yup";
import { StatusCodes } from "http-status-codes";
import { ICity } from "../../database/models/index.js";
import { validation } from "../../shared/middleware/index.js";
import { citiesProvider } from "../../database/providers/cities/index.js";

export interface IParamsProps {
  id?: number;
}

export interface IBodyProps extends Omit<ICity, "id"> {}

export const updateByIdValidation = validation((getSchema) => ({
  params: getSchema<IParamsProps>(
    yup.object().shape({
      id: yup.number().optional().moreThan(0),
    }),
  ),
  body: getSchema<IBodyProps>(
    yup.object().shape({
      name: yup.string().required().min(3),
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

  const result = await citiesProvider.updateById(req.params.id, req.body);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message,
      },
    });
  }

  return res.status(StatusCodes.NO_CONTENT).json(result);
};
