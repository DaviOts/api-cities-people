import { create } from "./Create.js";
// import { GetAll } from "./GetAll.js";
// import { GetById } from "./GetById.js";
// import { deleteById } from "./DeletedById.js";
// import { updateById } from "./UpdateById.js";

export class CitiesProvider {
  public create = create;
//   public getAll = GetAll;
//   public getById = GetById;
//   public deleteById = deleteById;
//   public updateById = updateById;
}

export const citiesProvider = new CitiesProvider();
