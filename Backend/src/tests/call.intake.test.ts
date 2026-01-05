import request from "supertest";
import app from "../app";

let token: string;

beforeAll(async () => {
  const res = await request(app)
    .post("/auth/login")
    .send({ phoneNumber: "0820000001" });
  token = res.body.token;
});

it("logs incoming call", async () => {
  const res = await request(app)
    .post("/calls/intake")
    .set("Authorization", `Bearer ${token}`)
    .send({ callerNumber: "0830000000", receiverId: "test" });

  expect(res.body.accepted).toBe(true);
});
