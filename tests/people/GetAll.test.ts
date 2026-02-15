import { testServer } from "../jest.setup";
import { StatusCodes } from "http-status-codes";

describe("people - GET ALL", () => {
  let cityId: number | undefined;
  beforeAll(async () => {
    const resCity = await testServer.post("/cities").send({ name: "Paraiba" });

    cityId = resCity.body;
  });

  it("Search all registers", async () => {
    const res1 = await testServer.post("/people").send({
      name: "Abraham",
      email: "Abraham@gmail.com",
      cityId,
    });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);

    const resSearch = await testServer.get("/people").send();

    expect(Number(resSearch.header["x-total-count"])).toBeGreaterThan(0);
    expect(resSearch.statusCode).toEqual(StatusCodes.OK);
    expect(resSearch.body.length).toBeGreaterThan(0);
  });
});
