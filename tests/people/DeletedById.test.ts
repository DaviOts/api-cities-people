import { testServer } from "../jest.setup";
import { StatusCodes } from "http-status-codes";

describe("people - DELETED BY ID", () => {
  let accessToken: string;
  let cityId: number | undefined;
  
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

    const resCity = await testServer.post("/cities").set("Authorization", `Bearer ${accessToken}`).send({ name: "Paraiba" });

    cityId = resCity.body;
  });

  it("not delete a register without access token", async () => {
    const res1 = await testServer.delete("/people/99999").send();

    expect(res1.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
    expect(res1.body).toHaveProperty("errors.default");
  });

  it("delete a register", async () => {
    const res1 = await testServer.post("/people").set("Authorization", `Bearer ${accessToken}`).send({
      name: "Abraham",
      email: "Abraham@gmail.com",
      cityId,
    });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);

    const resDeleted = await testServer.delete(`/people/${res1.body}`).set("Authorization", `Bearer ${accessToken}`).send();

    expect(resDeleted.statusCode).toEqual(StatusCodes.NO_CONTENT);
  });

  it("not deleted a register that not exists", async () => {
    const res1 = await testServer.delete("/people/99999").set("Authorization", `Bearer ${accessToken}`).send();

    expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res1.body).toHaveProperty("errors.default");
  });
});
