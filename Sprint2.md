SPRINT HANDOVER: Sprint 2 – Consent Engine & Spam Signal Enforcement

Source: ChatGPT-Generated Architectures
Instruction Mode: Execution / Fast-Track

📂 1. FILE ARCHITECTURE

Sprint 2 extends Sprint 1, no restructuring. New modules are added and fully wired.

backend/
├── src/
│ ├── modules/
│ │ ├── consent/
│ │ │ ├── consent.controller.ts
│ │ │ ├── consent.routes.ts
│ │ │ └── consent.service.ts
│ │ ├── spam/
│ │ │ ├── spam.controller.ts
│ │ │ ├── spam.routes.ts
│ │ │ └── spam.service.ts
│ │ └── calls/
│ │ └── call.policy.ts
│ ├── tests/
│ │ ├── consent.test.ts
│ │ ├── spam.test.ts
│ │ └── call.policy.test.ts
│ └── app.ts (UPDATED)
├── prisma/
│ └── schema.prisma (UPDATED)

🛠 2. DEPENDENCY INJECTION

No new runtime dependencies. Sprint 2 relies on Prisma and Jest already installed.

npm install zod

📄 3. FILE IMPLEMENTATION
backend/prisma/schema.prisma (UPDATED)
model Consent {
id String @id @default(uuid())
userId String
callerNumber String
granted Boolean @default(true)
createdAt DateTime @default(now())
revokedAt DateTime?
}

model SpamReport {
id String @id @default(uuid())
reporterId String
callerNumber String
reason String
createdAt DateTime @default(now())
}

Run after update:

npx prisma migrate dev -n add_consent_and_spam

backend/src/modules/consent/consent.service.ts
import prisma from "../../prismaClient";

export async function hasActiveConsent(
userId: string,
callerNumber: string
): Promise<boolean> {
const consent = await prisma.consent.findFirst({
where: {
userId,
callerNumber,
granted: true,
revokedAt: null
}
});
return Boolean(consent);
}

export async function grantConsent(userId: string, callerNumber: string) {
return prisma.consent.create({
data: { userId, callerNumber }
});
}

export async function revokeConsent(userId: string, callerNumber: string) {
return prisma.consent.updateMany({
where: { userId, callerNumber, revokedAt: null },
data: { granted: false, revokedAt: new Date() }
});
}

backend/src/modules/consent/consent.controller.ts
import { Request, Response } from "express";
import { grantConsent, revokeConsent } from "./consent.service";

export async function grant(req: Request, res: Response) {
const { callerNumber } = req.body;
await grantConsent(req.user.userId, callerNumber);
res.json({ granted: true });
}

export async function revoke(req: Request, res: Response) {
const { callerNumber } = req.body;
await revokeConsent(req.user.userId, callerNumber);
res.json({ revoked: true });
}

backend/src/modules/consent/consent.routes.ts
import { Router } from "express";
import { grant, revoke } from "./consent.controller";
import { authenticate } from "../../middleware/auth.middleware";

const router = Router();

router.post("/grant", authenticate, grant);
router.post("/revoke", authenticate, revoke);

export default router;

backend/src/modules/spam/spam.service.ts
import prisma from "../../prismaClient";

export async function reportSpam(
reporterId: string,
callerNumber: string,
reason: string
) {
return prisma.spamReport.create({
data: { reporterId, callerNumber, reason }
});
}

export async function spamReportCount(callerNumber: string): Promise<number> {
return prisma.spamReport.count({
where: { callerNumber }
});
}

backend/src/modules/spam/spam.controller.ts
import { Request, Response } from "express";
import { reportSpam } from "./spam.service";

export async function report(req: Request, res: Response) {
const { callerNumber, reason } = req.body;
await reportSpam(req.user.userId, callerNumber, reason);
res.json({ reported: true });
}

backend/src/modules/spam/spam.routes.ts
import { Router } from "express";
import { report } from "./spam.controller";
import { authenticate } from "../../middleware/auth.middleware";

const router = Router();

router.post("/report", authenticate, report);

export default router;

backend/src/modules/calls/call.policy.ts
import { hasActiveConsent } from "../consent/consent.service";
import { spamReportCount } from "../spam/spam.service";

const SPAM_THRESHOLD = 5;

export async function evaluateCallPolicy(
userId: string,
callerNumber: string
) {
const consent = await hasActiveConsent(userId, callerNumber);
const spamCount = await spamReportCount(callerNumber);

if (!consent && spamCount >= SPAM_THRESHOLD) {
return { allow: false, reason: "BLOCKED_SPAM_NO_CONSENT" };
}

return { allow: true };
}

backend/src/app.ts (UPDATED)
import express from "express";
import authRoutes from "./modules/auth/auth.routes";
import callRoutes from "./modules/calls/call.routes";
import consentRoutes from "./modules/consent/consent.routes";
import spamRoutes from "./modules/spam/spam.routes";

const app = express();
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/calls", callRoutes);
app.use("/consent", consentRoutes);
app.use("/spam", spamRoutes);

export default app;

🧪 4. TEST IMPLEMENTATION
backend/src/tests/consent.test.ts
import request from "supertest";
import app from "../app";

let token: string;

beforeAll(async () => {
const res = await request(app)
.post("/auth/login")
.send({ phoneNumber: "0821111111" });
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

backend/src/tests/spam.test.ts
import request from "supertest";
import app from "../app";

let token: string;

beforeAll(async () => {
const res = await request(app)
.post("/auth/login")
.send({ phoneNumber: "0822222222" });
token = res.body.token;
});

it("reports spam", async () => {
const res = await request(app)
.post("/spam/report")
.set("Authorization", `Bearer ${token}`)
.send({ callerNumber: "0840000000", reason: "telemarketing" });

expect(res.body.reported).toBe(true);
});

backend/src/tests/call.policy.test.ts
import { evaluateCallPolicy } from "../modules/calls/call.policy";
import prisma from "../prismaClient";

it("blocks when spam threshold exceeded and no consent", async () => {
for (let i = 0; i < 5; i++) {
await prisma.spamReport.create({
data: {
reporterId: `u${i}`,
callerNumber: "0850000000",
reason: "spam"
}
});
}

const result = await evaluateCallPolicy("userX", "0850000000");
expect(result.allow).toBe(false);
});

🔐 5. COMPLIANCE STATUS

Sprint 2 introduces enforceable POPIA primitives:

Explicit consent capture

Revocation with timestamps

Purpose-limited spam reporting

Deterministic policy decisions

No automation beyond threshold logic yet. This is correct for Sprint 2.
