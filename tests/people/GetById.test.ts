import { testServer } from "../jest.setup";
import { StatusCodes } from "http-status-codes";

describe("people - GET BY ID", () => {
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

    const resCity = await testServer
      .post("/cities")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({ name: "Paraiba" });

    cityId = resCity.body;
  });
  it("search a register by id", async () => {
    const res1 = await testServer
      .post("/people")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        name: "Abraham",
        email: "Abraham@gmail.com",
        cityId,
      });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);

    const resSearch = await testServer
      .get(`/people/${res1.body}`)
      .set("Authorization", `Bearer ${accessToken}`)
      .send();

    expect(resSearch.statusCode).toEqual(StatusCodes.OK);
    expect(resSearch.body).toHaveProperty("name");
  });

  it("not search a register by id that not exists", async () => {
    const res1 = await testServer
      .get("/people/99999")
      .set("Authorization", `Bearer ${accessToken}`)
      .send();

    expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res1.body).toHaveProperty("errors.default");
  });
});
