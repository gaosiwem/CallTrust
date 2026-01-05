import request from "supertest";
import app from "../app";

jest.setTimeout(15000);

it("logs in a user", async () => {
  const res = await request(app)
    .post("/auth/login")
    .send({ phoneNumber: "0820000000" });

  expect(res.body.token).toBeDefined();
});
