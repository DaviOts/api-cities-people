import { testServer } from "../jest.setup";
import { StatusCodes } from "http-status-codes";

describe("cities - GET BY ID", () => {
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

  it("search a register by id", async () => {
    const res1 = await testServer.post("/cities").set("Authorization", `Bearer ${accessToken}`).send({
      name: "Paraiba",
    });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);

    const resSearch = await testServer.get(`/cities/${res1.body}`).set("Authorization", `Bearer ${accessToken}`).send();

    expect(resSearch.statusCode).toEqual(StatusCodes.OK);
    expect(resSearch.body).toHaveProperty("name");
  });

  it("not search a register by id that not exists", async () => {
    const res1 = await testServer.get("/cities/99999").set("Authorization", `Bearer ${accessToken}`).send();

    expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res1.body).toHaveProperty("errors.default");
  });
});
