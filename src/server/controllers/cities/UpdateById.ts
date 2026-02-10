import type { Request, Response } from "express";
import * as yup from "yup";
import { StatusCodes } from "http-status-codes";


import { validation } from "../../shared/middleware/index.js";


export interface IParamsProps {
  id?: number;
}

export interface IBodyProps {
  name?: string;
}

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

export const updateById = async (req: Request<IParamsProps, {}, IBodyProps>, res: Response) => {
  console.log(req.params);
  console.log(req.body);

  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("nao implementado");
};
