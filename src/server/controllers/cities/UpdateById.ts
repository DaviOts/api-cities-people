import type { Request, Response } from "express";
import * as yup from "yup";
import { StatusCodes } from "http-status-codes";
import { ICity } from "../../database/models/index.js";
import { validation } from "../../shared/middleware/index.js";

export interface IParamsProps {
  id?: number;
}

export interface IBodyProps extends Omit<ICity, 'id'> { }

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
  if (Number(req.params.id) === 99999) {
    return res.status(StatusCodes.NOT_ACCEPTABLE).json({
      errors: {
        default: "Register not found",
      },
    });
  }

  return res.status(StatusCodes.NO_CONTENT).send();
};
