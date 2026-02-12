import { testServer } from "../jest.setup";
import { StatusCodes } from "http-status-codes";

describe("cities - GET ALL", () => {
  it("Search all registers", async () => {
    const res1 = await testServer.post("/cities").send({ name: "Paraiba" });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);

    const resSearch = await testServer.get("/cities").send();

    expect(Number(resSearch.header['x-total-count'])).toBeGreaterThan(0);
    expect(resSearch.statusCode).toEqual(StatusCodes.OK);
    expect(resSearch.body.length).toBeGreaterThan(0);
  });
});
