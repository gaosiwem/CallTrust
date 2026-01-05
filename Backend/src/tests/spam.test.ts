import request from "supertest";
import app from "../app";

let token: string;

beforeAll(async () => {
  await request(app)
    .post("/auth/register")
    .send({ phoneNumber: "0822222222", password: "password123" });

  const res = await request(app)
    .post("/auth/login")
    .send({ phoneNumber: "0822222222", password: "password123" });
  token = res.body.token;
});

it("reports spam", async () => {
  const res = await request(app)
    .post("/spam/report")
    .set("Authorization", `Bearer ${token}`)
    .send({ callerNumber: "0840000000", reason: "telemarketing" });

  expect(res.body.reported).toBe(true);
});
