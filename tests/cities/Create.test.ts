import { testServer } from "../jest.setup";
import { StatusCodes } from "http-status-codes";

describe("cities - CREATE", () => {
  let accessToken: '';
  beforeAll(async () => {
    await testServer.post("/sign-up").send({
      name: "Test",
      email: "test@test.com",
      password: "123456",
    });

    const res1 = await testServer.post("/sign-in").send({
      email: "test@test.com",
      password: "123456",
    });

    accessToken = res1.body.accessToken;
  });

  afterAll(async () => {
    await testServer.post("/sign-out").send();
  });

  it("should not create a register without authorization", async () => {
    const res1 = await testServer.post("/cities").send({
      name: "Paraiba",
    });

    expect(res1.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
    expect(res1.body).toHaveProperty("errors.default");
  });

  it("should create a register", async () => {
    const res1 = await testServer.post("/cities").set("Authorization", `Bearer ${accessToken}`).send({
      name: "Paraiba",
    });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof res1.body).toEqual("number");
  });

  it("should not create a register with name less than 3 characters", async () => {
    const res1 = await testServer.post("/cities").set("Authorization", `Bearer ${accessToken}`).send({
      name: "Pa",
    });

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty("errors.body.name");
  });

  it("should not create a register without name", async () => {
    const res1 = await testServer.post("/cities").set("Authorization", `Bearer ${accessToken}`).send({});

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty("errors.body.name");
  });
});
