import { Router } from "express";

import { citiesController, peopleController } from "../controllers/index.js";

const router = Router();

router.get("/", (req, res) => {
  return res.send("Ola");
});

router.get(
  "/cities",
  citiesController.getAllValidation,
  citiesController.getAll,
);
router.get(
  "/cities/:id",
  citiesController.getByIdValidation,
  citiesController.getById,
);
router.post(
  "/cities",
  citiesController.createValidation,
  citiesController.create,
);
router.put(
  "/cities/:id",
  citiesController.updateByIdValidation,
  citiesController.updateById,
);
router.delete(
  "/cities/:id",
  citiesController.deleteByIdValidation,
  citiesController.deleteById,
);


router.get(
  "/people",
  peopleController.getAllValidation,
  peopleController.getAll,
);
router.get(
  "/people/:id",
  peopleController.getByIdValidation,
  peopleController.getById,
);
router.post(
  "/people",
  peopleController.createValidation,
  peopleController.create,
);
router.put(
  "/people/:id",
  peopleController.updateByIdValidation,
  peopleController.updateById,
);
router.delete(
  "/people/:id",
  peopleController.deleteByIdValidation,
  peopleController.deleteById,
);

export { router };
