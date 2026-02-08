import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from 'yup';

export interface Icitie{
  name: string;
}

const bodyValidation: yup.ObjectSchema<Icitie> = yup.object().shape({
  name: yup.string().required().min(3)
})

export const create = async(req: Request<{}, {}, Icitie>, res: Response) => {
  let validatedData: Icitie | undefined = undefined;

  try {
    validatedData = await bodyValidation.validate(req.body);
  } catch (error) {
    const yupError = error as yup.ValidationError;

    res.status(StatusCodes.BAD_REQUEST).json({
      errors: {
        default: yupError.message
      }
    })
    
  }

  console.log(validatedData)
  return res.send('Create')
}

