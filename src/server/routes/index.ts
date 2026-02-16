import { Router } from "express";

import { citiesController, peopleController, usersController } from "../controllers/index.js";
import { ensureAuthenticated } from "../shared/middleware/index.js";

const router = Router();

router.get("/", (req, res) => {
  return res.send("Ola");
});

router.get(
  "/cities",
  ensureAuthenticated,
  citiesController.getAllValidation,
  citiesController.getAll,
);
router.get(
  "/cities/:id",
  ensureAuthenticated,
  citiesController.getByIdValidation,
  citiesController.getById,
);
router.post(
  "/cities",
  ensureAuthenticated,
  citiesController.createValidation,
  citiesController.create,
);
router.put(
  "/cities/:id",
  ensureAuthenticated,
  citiesController.updateByIdValidation,
  citiesController.updateById,
);
router.delete(
  "/cities/:id",
  ensureAuthenticated,
  citiesController.deleteByIdValidation,
  citiesController.deleteById,
);


router.get(
  "/people",
  ensureAuthenticated,
  peopleController.getAllValidation,
  peopleController.getAll,
);
router.get(
  "/people/:id",
  ensureAuthenticated,
  peopleController.getByIdValidation,
  peopleController.getById,
);
router.post(
  "/people",
  ensureAuthenticated,
  peopleController.createValidation,
  peopleController.create,
);
router.put(
  "/people/:id",
  ensureAuthenticated,
  peopleController.updateByIdValidation,
  peopleController.updateById,
);
router.delete(
  "/people/:id",
  ensureAuthenticated,
  peopleController.deleteByIdValidation,
  peopleController.deleteById,
);

router.post(
  "/sign-in",
  usersController.signInValidation,
  usersController.signIn,
);

router.post(
  "/sign-up",
  usersController.signUpValidation,
  usersController.signUp,
);

export { router };
