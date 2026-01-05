1. FILE ARCHITECTURE

Backend only. AI scaffold included.

Backend/
├── src/
│ ├── app.ts
│ ├── server.ts
│ ├── prismaClient.ts
│ ├── config/
│ │ └── env.ts
│ ├── modules/
│ │ ├── auth/
│ │ │ ├── auth.controller.ts
│ │ │ ├── auth.routes.ts
│ │ │ └── auth.service.ts
│ │ ├── users/
│ │ │ └── user.service.ts
│ │ └── calls/
│ │ ├── call.controller.ts
│ │ ├── call.routes.ts
│ │ └── call.service.ts
│ ├── middleware/
│ │ └── auth.middleware.ts
│ └── tests/
│ ├── auth.test.ts
│ └── call.intake.test.ts
├── prisma/
│ └── schema.prisma
├── Dockerfile
└── docker-compose.yml

🛠 2. DEPENDENCY INJECTION
npm install express cors helmet dotenv
npm install prisma @prisma/client
npm install jsonwebtoken bcrypt
npm install --save-dev typescript ts-node nodemon
npm install --save-dev jest ts-jest supertest

📄 3. FILE IMPLEMENTATION
Backend/src/config/env.ts
import dotenv from "dotenv";
dotenv.config();

export const ENV = {
PORT: process.env.PORT || "3000",
JWT_SECRET: process.env.JWT_SECRET || "dev_secret"
};

Backend/src/prismaClient.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export default prisma;

Backend/prisma/schema.prisma
datasource db {
provider = "postgresql"
url = env("DATABASE_URL")
}

generator client {
provider = "prisma-client-js"
}

model User {
id String @id @default(uuid())
phoneNumber String @unique
createdAt DateTime @default(now())
}

model CallLog {
id String @id @default(uuid())
callerNumber String
receiverId String
createdAt DateTime @default(now())
}

Backend/src/modules/auth/auth.service.ts
import prisma from "../../prismaClient";
import jwt from "jsonwebtoken";
import { ENV } from "../../config/env";

export async function login(phoneNumber: string) {
let user = await prisma.user.findUnique({ where: { phoneNumber } });

if (!user) {
user = await prisma.user.create({ data: { phoneNumber } });
}

const token = jwt.sign({ userId: user.id }, ENV.JWT_SECRET);
return { token };
}

Backend/src/modules/auth/auth.controller.ts
import { Request, Response } from "express";
import { login } from "./auth.service";

export async function loginController(req: Request, res: Response) {
const { phoneNumber } = req.body;
const result = await login(phoneNumber);
res.json(result);
}

Backend/src/modules/auth/auth.routes.ts
import { Router } from "express";
import { loginController } from "./auth.controller";

const router = Router();
router.post("/login", loginController);

export default router;

Backend/src/middleware/auth.middleware.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { ENV } from "../config/env";

export function authenticate(req: Request, res: Response, next: NextFunction) {
const token = req.headers.authorization?.split(" ")[1];
if (!token) return res.status(401).end();

try {
req.user = jwt.verify(token, ENV.JWT_SECRET);
next();
} catch {
res.status(401).end();
}
}

Backend/src/modules/calls/call.service.ts
import prisma from "../../prismaClient";

export async function logIncomingCall(
callerNumber: string,
receiverId: string
) {
return prisma.callLog.create({
data: { callerNumber, receiverId }
});
}

Backend/src/modules/calls/call.controller.ts
import { Request, Response } from "express";
import { logIncomingCall } from "./call.service";

export async function intakeCall(req: Request, res: Response) {
const { callerNumber, receiverId } = req.body;
await logIncomingCall(callerNumber, receiverId);
res.json({ accepted: true });
}

Backend/src/modules/calls/call.routes.ts
import { Router } from "express";
import { intakeCall } from "./call.controller";
import { authenticate } from "../../middleware/auth.middleware";

const router = Router();
router.post("/intake", authenticate, intakeCall);

export default router;

Backend/src/app.ts
import express from "express";
import authRoutes from "./modules/auth/auth.routes";
import callRoutes from "./modules/calls/call.routes";

const app = express();
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/calls", callRoutes);

export default app;

Backend/src/server.ts
import app from "./app";
import { ENV } from "./config/env";

app.listen(ENV.PORT, () => {
console.log(`Running on ${ENV.PORT}`);
});

Backend/src/tests/auth.test.ts
import request from "supertest";
import app from "../app";

it("logs in a user", async () => {
const res = await request(app)
.post("/auth/login")
.send({ phoneNumber: "0820000000" });

expect(res.body.token).toBeDefined();
});

Backend/src/tests/call.intake.test.ts
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

🐳 5. CONTAINERISATION
Backend/Dockerfile
FROM node:20
WORKDIR /app
COPY . .
RUN npm install
RUN npx prisma generate
CMD ["npm","run","start"]

Backend/docker-compose.yml
version: "3.9"
services:
api:
build: .
ports: - "3000:3000"
depends_on: - db
environment:
DATABASE_URL: postgres://postgres:postgres@db:5432/app
JWT_SECRET: dev_secret
db:
image: postgres:15
environment:
POSTGRES_PASSWORD: postgres
