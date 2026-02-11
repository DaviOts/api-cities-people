import { testServer } from "../jest.setup";
import { StatusCodes } from "http-status-codes";

describe("cities - CREATE", () => {
  it("should create a register", async () => {
    const res1 = await testServer.post("/cities").send({
      name: "Paraiba",
    });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof res1.body).toEqual("number");
  });

  it("should not create a register with name less than 3 characters", async () => {
    const res1 = await testServer.post("/cities").send({
      name: "Pa",
    });

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty("errors.body.name");
  });

  it("should not create a register without name", async () => {
    const res1 = await testServer.post("/cities").send({});

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty("errors.body.name");
  });
});
