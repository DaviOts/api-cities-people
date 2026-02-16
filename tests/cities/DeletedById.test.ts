import { testServer } from "../jest.setup";
import { StatusCodes } from "http-status-codes";

describe("cities - DELETED BY ID", () => {
  let accessToken: string;
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

  it("delete a register", async () => {
    const res1 = await testServer.post("/cities").set("Authorization", `Bearer ${accessToken}`).send({
      name: "Paraiba",
    });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);

    const resDeleted = await testServer.delete(`/cities/${res1.body}`).set("Authorization", `Bearer ${accessToken}`).send();

    expect(resDeleted.statusCode).toEqual(StatusCodes.NO_CONTENT);
  });

  it("not deleted a register that not exists", async () => {
    const res1 = await testServer.delete("/cities/99999").set("Authorization", `Bearer ${accessToken}`).send();

    expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res1.body).toHaveProperty("errors.default");
  });
});
