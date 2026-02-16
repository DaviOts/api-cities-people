import { testServer } from "../jest.setup";
import { StatusCodes } from "http-status-codes";

describe("people - CREATE", () => {
  let cityId: number | undefined;
  beforeAll(async () => {
    const resCity = await testServer.post("/cities").send({ name: "Paraiba" });

    cityId = resCity.body;
  });
  it("should create a register", async () => {
    const res1 = await testServer.post("/people").send({
      name: "Abraham",
      email: "Abraham@gmail.com",
      cityId,
    });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof res1.body).toEqual("number");
  });

  it("should create a register 2", async () => {
    const res1 = await testServer.post("/people").send({
      name: "Abracadabra",
      email: "Abracadabra@gmail.com",
      cityId,
    });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof res1.body).toEqual("number");
  });

  it("should not create a register with name less than 3 characters", async () => {
    const res1 = await testServer.post("/people").send({
      name: "Ab",
      email: "Abraham@gmail.com",
      cityId,
    });

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty("errors.body.name");
  });

  it("should not create a register without name", async () => {
    const res1 = await testServer.post("/people").send({
      email: "Abraham@gmail.com",
      cityId,
    });

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty("errors.body.name");
  });

  it("should not create a register without email", async () => {
    const res1 = await testServer.post("/people").send({
      name: "Abraham",
      cityId,
    });

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty("errors.body.email");
  });

  it("should not create a register with email invalid", async () => {
    const res1 = await testServer.post("/people").send({
      name: "Abraham",
      email: "Abraham @gmail.com",
      cityId,
    });

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty("errors.body.email");
  });

  it("should not create a register with email duplicated", async () => {
    const res1 = await testServer.post("/people").send({
      name: "Abraham",
      email: "Abraham5@gmail.com",
      cityId,
    });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof res1.body).toEqual("number");

    const res2 = await testServer.post("/people").send({
      name: "Duplicated",
      email: "Abraham5@gmail.com",
      cityId,
    });

    expect(res2.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res2.body).toHaveProperty("errors.default");
  });

  it("should not create a register without cityId", async () => {
    const res1 = await testServer.post("/people").send({
      name: "Abraham",
      email: "Abraham@gmail.com",
    });

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty("errors.body.cityId");
  });

  it("should not create a register with cityId invalid", async () => {
    const res1 = await testServer.post("/people").send({
      name: "Abraham",
      email: "Abraham@gmail.com",
      cityId: 0 || "a" || 99999,
    });

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty("errors.body.cityId");
  });
});

  it("should not create a register with non properties", async () => {
    const res1 = await testServer.post("/people").send({});

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty("errors.body.name");
    expect(res1.body).toHaveProperty("errors.body.email");
    expect(res1.body).toHaveProperty("errors.body.cityId");
  });
