import { testServer } from "../jest.setup";
import { StatusCodes } from "http-status-codes";

describe("cities - UPDATE BY ID", () => {
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

  it("update a register", async () => {
    const res1 = await testServer.post("/cities").set("Authorization", `Bearer ${accessToken}`).send({
      name: "Paraiba",
    });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);

    const resUpdate = await testServer.put(`/cities/${res1.body}`).set("Authorization", `Bearer ${accessToken}`).send({
      name: "Paraiba",
    });

    expect(resUpdate.statusCode).toEqual(StatusCodes.NO_CONTENT);
  });

  it("not update a register that not exists", async () => {
    const res1 = await testServer.put("/cities/99999").set("Authorization", `Bearer ${accessToken}`).send({
      name: "Paraiba",
    });

    expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res1.body).toHaveProperty("errors.default");
  });
  it("not update a register with name less than 3 characters", async () => {
    const res1 = await testServer.post("/cities").set("Authorization", `Bearer ${accessToken}`).send({
      name: "Pa"
    });

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty("errors.body.name");
  });
  it("not update a register without name", async () => {
    const res1 = await testServer.post("/cities").set("Authorization", `Bearer ${accessToken}`).send({});

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty("errors.body.name");
  });
});
