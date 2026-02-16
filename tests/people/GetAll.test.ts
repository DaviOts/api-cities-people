import { testServer } from "../jest.setup";
import { StatusCodes } from "http-status-codes";

describe("people - GET ALL", () => {
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

  it("not search all registers without access token", async () => {
    const res1 = await testServer.get("/people").send();

    expect(res1.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
    expect(res1.body).toHaveProperty("errors.default");
  });

  it("Search all registers", async () => {
    const res1 = await testServer.post("/people").set("Authorization", `Bearer ${accessToken}`).send({
      name: "Abraham",
      email: "Abraham@gmail.com",
      cityId,
    });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);

    const resSearch = await testServer.get("/people").set("Authorization", `Bearer ${accessToken}`).send();

    expect(Number(resSearch.header["x-total-count"])).toBeGreaterThan(0);
    expect(resSearch.statusCode).toEqual(StatusCodes.OK);
    expect(resSearch.body.length).toBeGreaterThan(0);
  });
});
