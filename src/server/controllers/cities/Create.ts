import type { Request, Response } from "express";
import * as yup from "yup";
import { StatusCodes } from "http-status-codes";


import { validation } from "../../shared/middleware/index.js";


export interface Icitie {
  name: string;
}

export const createValidation = validation((getSchema) => ({
  body: getSchema<Icitie>(
    yup.object().shape({
      name: yup.string().required().min(3),
    }),
  ),
}));

export const create = async (req: Request<{}, {}, Icitie>, res: Response) => {
  console.log(req.body);

  return res.status(StatusCodes.CREATED).json(1);
};
