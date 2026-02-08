import type { Request, Response } from "express";

export interface Icitie{
  name: string;
}

export const create = async(req: Request<{}, {}, Icitie>, res: Response) => {

  const data = req.body;
  console.log(data);

  return res.send('Create')
}