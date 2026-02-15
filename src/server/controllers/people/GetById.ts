import type { Request, Response } from "express";
import * as yup from "yup";
import { StatusCodes } from "http-status-codes";

import { validation } from "../../shared/middleware/index.js";
import { peopleProvider } from "../../database/providers/people/index.js";

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
  if (!req.params.id)
    return res.status(StatusCodes.NOT_ACCEPTABLE).json({
      errors: {
        default: "Parameter id is not valid",
      },
    });

  const result = await peopleProvider.getById(req.params.id);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message,
      },
    });
  }

  return res.status(StatusCodes.OK).json(result);
};
