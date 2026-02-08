import { Router } from 'express';
import {StatusCodes} from 'http-status-codes'

import { citiesController } from '../controllers/index.js';

const router = Router();

router.get('/', (req, res) => {
  return res.send('Ola')
})

router.post('/cities', citiesController.create);





export {router};