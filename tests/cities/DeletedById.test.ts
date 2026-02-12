import { testServer } from "../jest.setup";
import { StatusCodes } from "http-status-codes";

describe("cities - DELETED BY ID", () => {
  it("delete a register", async () => {
    const res1 = await testServer.post("/cities").send({
      name: "Paraiba"
    });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);


    const resDeleted = await testServer.delete(`/cities/${res1.body}`).send();

    expect(resDeleted.statusCode).toEqual(StatusCodes.NO_CONTENT);
  });

  it("not deleted a register that not exists", async () => {
    const res1 = await testServer.delete("/cities/9999").send();

    expect(res1.statusCode).toEqual(StatusCodes.NOT_ACCEPTABLE);
    expect(res1.body).toHaveProperty("errors.default");
  });
});
