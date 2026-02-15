import { testServer } from "../jest.setup";
import { StatusCodes } from "http-status-codes";

describe("people - UPDATE BY ID", () => {
  let cityId: number | undefined;
  beforeAll(async () => {
    const resCity = await testServer.post("/cities").send({ name: "Paraiba" });

    cityId = resCity.body;
  });
  it("update a register", async () => {
    const res1 = await testServer.post("/people").send({
      name: "Abraham",
      email: "Abraham@gmail.com",
      cityId,
    });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);

    const resUpdate = await testServer.put(`/people/${res1.body}`).send({
      name: "Abraham",
      email: "AbrahamUpdated@gmail.com",
      cityId,
    });

    expect(resUpdate.statusCode).toEqual(StatusCodes.NO_CONTENT);
  });

  it("not update a register that not exists", async () => {
    const res1 = await testServer.put("/people/99999").send({
      name: "Abraham",
      email: "Abraham@gmail.com",
      cityId,
    });

    expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res1.body).toHaveProperty("errors.default");
  });
  it("not update a register with name less than 3 characters", async () => {
    const res1 = await testServer.post("/people").send({
      name: "Ab",
    });

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty("errors.body.name");
  });
  it("not update a register without name", async () => {
    const res1 = await testServer.post("/people").send({});

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty("errors.body.name");
  });
  it("not update a register with email invalid", async () => {
    const res1 = await testServer.post("/people").send({
      name: "Abraham",
      email: "Abraham @gmail.com",
      cityId,
    });

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty("errors.body.email");
  });
  it("not update a register without cityId", async () => {
    const res1 = await testServer.post("/people").send({
      name: "Abraham",
      email: "Abraham@gmail.com",
    });

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty("errors.body.cityId");
  });
  it("not update a register with cityId not found", async () => {
    const res1 = await testServer.post("/people").send({
      name: "Abraham",
      email: "Abraham@gmail.com",
      cityId: 0 || "a" || 99999,
    });

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty("errors.body.cityId");
  });
});
