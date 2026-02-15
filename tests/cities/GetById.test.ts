import { testServer } from "../jest.setup";
import { StatusCodes } from "http-status-codes";

describe("cities - GET BY ID", () => {
  it("search a register by id", async () => {
    const res1 = await testServer.post("/cities").send({
      name: "Paraiba",
    });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);

    const resSearch = await testServer.get(`/cities/${res1.body}`).send();

    expect(resSearch.statusCode).toEqual(StatusCodes.OK);
    expect(resSearch.body).toHaveProperty("name");
  });

  it("not search a register by id that not exists", async () => {
    const res1 = await testServer.get("/cities/99999").send();

    expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res1.body).toHaveProperty("errors.default");
  });
});
