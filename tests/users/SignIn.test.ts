import { testServer } from "../jest.setup";
import { StatusCodes } from "http-status-codes";

describe("users - SIGN IN", () => {
  beforeAll(async () => {
    await testServer.post("/sign-up").send({
      name: "Abraham",
      email: "abraham@gmail.com",
      password: "123456",
    });
  });

  it("should sign in", async () => {
    const res1 = await testServer.post("/sign-in").send({
      email: "abraham@gmail.com",
      password: "123456",
    });

    expect(res1.statusCode).toEqual(StatusCodes.OK);
    expect(res1.body).toHaveProperty("accessToken");
  });

  it("should not sign with wrong email", async () => {
    const res1 = await testServer.post("/sign-in").send({
      email: "abraham92@gmail.com",
      password: "123456",
    });

    expect(res1.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
    expect(res1.body).toHaveProperty("errors.default");
  });

  it("should not sign with wrong password", async () => {
    const res1 = await testServer.post("/sign-in").send({
      email: "abraham@gmail.com",
      password: "1234567312",
    });

    expect(res1.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
    expect(res1.body).toHaveProperty("errors.default");
  });

  it("should not sign in with invalid email", async () => {
    const res1 = await testServer.post("/sign-in").send({
      email: "abraham @gmail.com",
      password: "123456",
    });

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty("errors.body.email");
  });

  it("should not sign in with password less than 6 characters", async () => {
    const res1 = await testServer.post("/sign-in").send({
      email: "abraham@gmail.com",
      password: "123",
    });

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty("errors.body.password");
  });

  it("should not sign in without email", async () => {
    const res1 = await testServer.post("/sign-in").send({
      password: "123456",
    });

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty("errors.body.email");
  });

  it("should not sign in without password", async () => {
    const res1 = await testServer.post("/sign-in").send({
      email: "abraham@gmail.com",
    });

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty("errors.body.password");
  });
});
