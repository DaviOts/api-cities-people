import {create} from './Create.js';


// export const CidadesController = {
//   ...create,
// }

export class CitiesController{
  public create = create;
}

export const citiesController = new CitiesController;


