import { Router } from "express";

import {
  citiesController,
  peopleController,
  usersController,
} from "../controllers/index.js";
import { ensureAuthenticated } from "../shared/middleware/index.js";
import { Knex } from "../database/knex/index.js";
import { ETableNames } from "../database/ETableNames.js";

const router = Router();



router.get("/", async (req, res) => {
  const [{ count: totalCities }] = (await Knex(ETableNames.CITIES).count<
    [{ count: number }]
  >("* as count")) as unknown as [{ count: number }];
  const [{ count: totalPeople }] = (await Knex(ETableNames.PEOPLE).count<
    [{ count: number }]
  >("* as count")) as unknown as [{ count: number }];

  return res.render("index", { totalCities, totalPeople });
});


router.get("/view/cities", async (req, res) => {
  const cities = await Knex(ETableNames.CITIES).select("*");
  const totalCities = cities.length;

  return res.render("cities", { cities, totalCities });
});


router.get("/view/people", async (req, res) => {
  const people = await Knex(ETableNames.PEOPLE)
    .select(`${ETableNames.PEOPLE}.*`, `${ETableNames.CITIES}.name as cityName`)
    .leftJoin(
      ETableNames.CITIES,
      `${ETableNames.PEOPLE}.cityId`,
      `${ETableNames.CITIES}.id`,
    );
  const totalPeople = people.length;

  return res.render("people", { people, totalPeople });
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
