import type { Request, Response } from "express";
import * as yup from "yup";
import { StatusCodes } from "http-status-codes";


import { validation } from "../../shared/middleware/index.js";
import { ICity } from "../../database/models/index.js";


export interface IBodyProps extends Omit<ICity, 'id'> { }

export const createValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(
    yup.object().shape({
      name: yup.string().required().min(3),
    }),
  ),
}));

export const create = async (req: Request<{}, {}, IBodyProps>, res: Response) => {
  console.log(req.body);

  return res.status(StatusCodes.CREATED).json(1);
};
