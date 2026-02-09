import type { Request, Response } from "express";
import * as yup from "yup";

import { validation } from "../../shared/middleware/index.js";

export interface Icitie {
  name: string;
  state: string;
}

export interface Ifilter {
  filter?: string;
}

export const createValidation = validation((getSchema) => ({
  body: getSchema<Icitie>(
    yup.object().shape({
      name: yup.string().required().min(3),
      state: yup.string().required().min(3),
    }),
  ),
  query: getSchema<Ifilter>(
    yup.object().shape({
      filter: yup.string().optional().min(3),
    }),
  ),
}));

export const create = async (req: Request<{}, {}, Icitie>, res: Response) => {
  console.log(req.body);

  return res.send("Create");
};
