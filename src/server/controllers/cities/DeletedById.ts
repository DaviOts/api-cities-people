import type { Request, Response } from "express";
import * as yup from "yup";
import { StatusCodes } from "http-status-codes";


import { validation } from "../../shared/middleware/index.js";


export interface IParamsProps {
  id?: number;
}

export const deleteByIdValidation = validation((getSchema) => ({
  params: getSchema<IParamsProps>(
    yup.object().shape({
      id: yup.number().required().moreThan(0),
    }),
  ),
}));

export const deleteById = async (req: Request<IParamsProps>, res: Response) => {

  if (Number(req.params.id) === 9999) return res.status(StatusCodes.NOT_ACCEPTABLE).json({
    errors: {
     default: "Not Found" 
    }
  })


  return res.status(StatusCodes.NO_CONTENT).send();
};
