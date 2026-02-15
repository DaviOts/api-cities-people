import { testServer } from "../jest.setup";
import { StatusCodes } from "http-status-codes";

describe("people - GET BY ID", () => {
  let cityId: number | undefined;
  beforeAll(async () => {
    const resCity = await testServer.post("/cities").send({ name: "Paraiba" });

    cityId = resCity.body;
  });
  it("search a register by id", async () => {
    const res1 = await testServer.post("/people").send({
      name: "Abraham",
      email: "Abraham@gmail.com",
      cityId,
    });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);

    const resSearch = await testServer.get(`/people/${res1.body}`).send();

    expect(resSearch.statusCode).toEqual(StatusCodes.OK);
    expect(resSearch.body).toHaveProperty("name");
  });

  it("not search a register by id that not exists", async () => {
    const res1 = await testServer.get("/people/99999").send();

    expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res1.body).toHaveProperty("errors.default");
  });
});
