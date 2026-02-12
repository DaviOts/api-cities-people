import { testServer } from "../jest.setup";
import { StatusCodes } from "http-status-codes";

describe("cities - UPDATE BY ID", () => {
  it("update a register", async () => {
    const res1 = await testServer.post("/cities").send({
      name: "Paraiba",
    });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);

    const resUpdate = await testServer.put(`/cities/${res1.body}`).send({
      name: "Paraiba",
    });

    expect(resUpdate.statusCode).toEqual(StatusCodes.NO_CONTENT);
  });

  it("not update a register that not exists", async () => {
    const res1 = await testServer.put("/cities/99999").send({
      name: "Paraiba",
    });

    expect(res1.statusCode).toEqual(StatusCodes.NOT_ACCEPTABLE);
    expect(res1.body).toHaveProperty("errors.default");
  });
  it("not update a register with name less than 3 characters", async () => {
    const res1 = await testServer.post("/cities").send({
      name: "Pa"
    });

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty("errors.body.name");
  });
  it("not update a register without name", async () => {
    const res1 = await testServer.post("/cities").send({});

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty("errors.body.name");
  });
});
