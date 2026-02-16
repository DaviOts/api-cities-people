import { testServer } from "../jest.setup";
import { StatusCodes } from "http-status-codes";

describe("cities - GET ALL", () => {
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

  it("Search all registers", async () => {
    const res1 = await testServer.post("/cities").set("Authorization", `Bearer ${accessToken}`).send({ name: "Paraiba" });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);

    const resSearch = await testServer.get("/cities").set("Authorization", `Bearer ${accessToken}`).send();

    expect(Number(resSearch.header['x-total-count'])).toBeGreaterThan(0);
    expect(resSearch.statusCode).toEqual(StatusCodes.OK);
    expect(resSearch.body.length).toBeGreaterThan(0);
  });
});
