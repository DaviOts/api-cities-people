import { testServer } from "../jest.setup";
import { StatusCodes } from "http-status-codes";

describe("users - SIGN UP", () => {
  it("should sign up", async () => {
    const res1 = await testServer.post("/sign-up").send({
      name: "Abraham",
      email: "abraham@gmail.com",
      password: "123456",
    });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof res1.body).toEqual("number");
  });

  it("users - SIGN UP 2", async () => {
    const res1 = await testServer.post("/sign-up").send({
      name: "Abracadabra",
      email: "abracadabra@gmail.com",
      password: "123456",
    });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof res1.body).toEqual("number");
  });

  it("should not sign up with name less than 3 characters", async () => {
    const res1 = await testServer.post("/sign-up").send({
      name: "Ab",
      email: "abraham@gmail.com",
      password: "123456",
    });

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty("errors.body.name");
  });

  it("should not sign up without name", async () => {
    const res1 = await testServer.post("/sign-up").send({
      email: "abraham@gmail.com",
      password: "123456",
    });

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty("errors.body.name");
  });

  it("should not sign up without email", async () => {
    const res1 = await testServer.post("/sign-up").send({
      name: "Abraham",
      password: "123456",
    });

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty("errors.body.email");
  });

  it("should not sign up without password", async () => {
    const res1 = await testServer.post("/sign-up").send({
      name: "Abraham",
      email: "abraham@gmail.com",
    });

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty("errors.body.password");
  });

  it("should not sign up with password less than 6 characters", async () => {
    const res1 = await testServer.post("/sign-up").send({
      name: "Abraham",
      email: "abraham@gmail.com",
      password: "123",
    });

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty("errors.body.password");
  });

  it("should not sign up with email already in use", async () => {
    const res1 = await testServer.post("/sign-up").send({
      name: "Jose",
      email: "abraham5@gmail.com",
      password: "123456",
    });
    expect(res1.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof res1.body).toEqual("number");

    const res2 = await testServer.post("/sign-up").send({
      name: "Abraham",
      email: "abraham5@gmail.com",
      password: "123456",
    });

    expect(res2.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res2.body).toHaveProperty("errors.default");
  });

  it("should not sign up with email invalid", async () => {
    const res1 = await testServer.post("/sign-up").send({
      name: "Abraham",
      email: "abraham @gmail.com",
      password: "123456",
    });

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty("errors.body.email");
  });
});
