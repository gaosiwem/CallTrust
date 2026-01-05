import request from "supertest";
import app from "../app";

let token: string;

beforeAll(async () => {
  // Register and login to get a token
  await request(app)
    .post("/auth/register")
    .send({ phoneNumber: "0821111111", password: "password123" });

  const res = await request(app)
    .post("/auth/login")
    .send({ phoneNumber: "0821111111", password: "password123" });
  token = res.body.token;
});

it("grants and revokes consent", async () => {
  await request(app)
    .post("/consent/grant")
    .set("Authorization", `Bearer ${token}`)
    .send({ callerNumber: "0830000000" })
    .expect(200);

  await request(app)
    .post("/consent/revoke")
    .set("Authorization", `Bearer ${token}`)
    .send({ callerNumber: "0830000000" })
    .expect(200);
});
