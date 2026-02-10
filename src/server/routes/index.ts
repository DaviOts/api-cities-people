import { Router } from 'express';

import { citiesController } from '../controllers/index.js';
import { createValidation } from '../controllers/cities/Create.js';
import { getAllValidation } from '../controllers/cities/GetAll.js';
import { getByIdValidation } from '../controllers/cities/GetById.js';
import { deleteByIdValidation } from '../controllers/cities/DeletedById.js';
import { updateByIdValidation } from '../controllers/cities/UpdateById.js';

const router = Router();

router.get('/', (req, res) => {
  return res.send('Ola')
})



router.get('/cities', getAllValidation, citiesController.getAll);
router.get('/cities/:id', getByIdValidation, citiesController.getById);
router.post('/cities', createValidation, citiesController.create);
router.put('/cities/:id', updateByIdValidation, citiesController.updateById);
router.delete('/cities/:id', deleteByIdValidation, citiesController.deleteById);




export {router};