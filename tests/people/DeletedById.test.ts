import { testServer } from "../jest.setup";
import { StatusCodes } from "http-status-codes";

describe("people - DELETED BY ID", () => {
  let cityId: number | undefined;
  beforeAll(async () => {
    const resCity = await testServer.post("/cities").send({ name: "Paraiba" });

    cityId = resCity.body;
  });
  it("delete a register", async () => {
    const res1 = await testServer.post("/people").send({
      name: "Abraham",
      email: "Abraham@gmail.com",
      cityId,
    });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);

    const resDeleted = await testServer.delete(`/people/${res1.body}`).send();

    expect(resDeleted.statusCode).toEqual(StatusCodes.NO_CONTENT);
  });

  it("not deleted a register that not exists", async () => {
    const res1 = await testServer.delete("/people/99999").send();

    expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res1.body).toHaveProperty("errors.default");
  });
});
