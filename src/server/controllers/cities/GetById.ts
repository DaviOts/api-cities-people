import type { Request, Response } from "express";
import * as yup from "yup";
import { StatusCodes } from "http-status-codes";

import { validation } from "../../shared/middleware/index.js";

export interface IParamsProps {
  id?: number;
}

export const getByIdValidation = validation((getSchema) => ({
  params: getSchema<IParamsProps>(
    yup.object().shape({
      id: yup.number().required().moreThan(0),
    }),
  ),
}));

export const GetById = async (req: Request<IParamsProps>, res: Response) => {
  if (Number(req.params.id) === 99999)
    return res.status(StatusCodes.NOT_ACCEPTABLE).json({
      errors: {
        default: "Register not found",
      },
    });

  return res.status(StatusCodes.OK).json({
    id: req.params.id,
    name: "Paraiba",
  });
};
