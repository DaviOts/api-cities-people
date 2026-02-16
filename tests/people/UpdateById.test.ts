import { testServer } from "../jest.setup";
import { StatusCodes } from "http-status-codes";

describe("people - UPDATE BY ID", () => {
  let accessToken: string = "";
  let cityId: number | undefined;
  let personId: number | undefined;

  beforeAll(async () => {
    await testServer.post("/sign-up").send({
      name: "TestUpdate",
      email: "test.update@test.com",
      password: "123456",
    });

    const resLogin = await testServer
      .post("/sign-in")
      .send({ email: "test.update@test.com", password: "123456" });
    accessToken = resLogin.body.accessToken;

    const resCity = await testServer
      .post("/cities")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({ name: "Paraiba" });
    cityId = resCity.body;

    const resPerson = await testServer
      .post("/people")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        name: "Original Name",
        email: "original.update@test.com",
        cityId,
      });
    personId = resPerson.body;
  });

  it("should update a register", async () => {
    const res1 = await testServer
      .put(`/people/${personId}`)
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        name: "Updated Name",
        email: "updated.update@test.com",
        cityId,
      });

    expect(res1.statusCode).toEqual(StatusCodes.NO_CONTENT);
  });

  it("should not update a register that not exists", async () => {
    const res1 = await testServer
      .put("/people/99999")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        name: "Updated Name",
        email: "updated.update@test.com",
        cityId,
      });

    expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res1.body).toHaveProperty("errors.default");
  });

  it("should not update without access token", async () => {
    const res1 = await testServer.put(`/people/${personId}`).send({
      name: "Updated Name",
      email: "updated.update@test.com",
      cityId,
    });

    expect(res1.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
    expect(res1.body).toHaveProperty("errors.default");
  });

  it("should not update a register with name less than 3 characters", async () => {
    const res1 = await testServer
      .put(`/people/${personId}`)
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        name: "Ab",
        email: "updated.update@test.com",
        cityId,
      });

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty("errors.body.name");
  });

  it("should not update a register without name", async () => {
    const res1 = await testServer
      .put(`/people/${personId}`)
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        email: "updated.update@test.com",
        cityId,
      });

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty("errors.body.name");
  });

  it("should not update a register with email invalid", async () => {
    const res1 = await testServer
      .put(`/people/${personId}`)
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        name: "Updated Name",
        email: "invalid-email",
        cityId,
      });

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty("errors.body.email");
  });

  it("should not update a register without cityId", async () => {
    const res1 = await testServer
      .put(`/people/${personId}`)
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        name: "Updated Name",
        email: "updated.update@test.com",
      });

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty("errors.body.cityId");
  });

  it("should not update a register with cityId not found", async () => {
    const res1 = await testServer
      .put(`/people/${personId}`)
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        name: "Updated Name",
        email: "updated.update@test.com",
        cityId: 99999,
      });

    expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res1.body).toHaveProperty("errors.default");
  });
});
