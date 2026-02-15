import { create } from "./Create.js";
import { getAll } from "./GetAll.js";
import { getById } from "./GetById.js";
import { deleteById } from "./DeletedById.js";
import { updateById } from "./UpdateById.js";
import { count } from "./Count.js";

export class CitiesProvider {
  public create = create;
  public getAll = getAll;
  public getById = getById;
  public deleteById = deleteById;
  public updateById = updateById;
  public count = count;
}

export const citiesProvider = new CitiesProvider();
