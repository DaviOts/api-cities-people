import { Router } from 'express';

import { citiesController } from '../controllers/index.js';
import { createValidation } from '../controllers/cities/Create.js';

const router = Router();

router.get('/', (req, res) => {
  return res.send('Ola')
})


router.post('/cities', createValidation, citiesController.create);





export {router};