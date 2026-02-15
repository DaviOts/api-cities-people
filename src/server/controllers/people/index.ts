import * as Create from "./Create.js";
import * as GetAll from "./GetAll.js";
import * as GetById from "./GetById.js";
import * as DeleteById from "./DeletedById.js";
import * as UpdateById from "./UpdateById.js";

export class PeopleController {
  public create = Create.create;
  public getAll = GetAll.GetAll;
  public getById = GetById.GetById;
  public deleteById = DeleteById.deleteById;
  public updateById = UpdateById.updateById;
  public createValidation = Create.createValidation;
  public getAllValidation = GetAll.getAllValidation;
  public getByIdValidation = GetById.getByIdValidation;
  public deleteByIdValidation = DeleteById.deleteByIdValidation;
  public updateByIdValidation = UpdateById.updateByIdValidation;
}

export const peopleController = new PeopleController();