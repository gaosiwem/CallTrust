SPRINT HANDOVER: Sprint 4 – Business Identity, Verification & Reputation Engine

Source: ChatGPT-Generated Architectures
Instruction Mode: Execution / Fast-Track

📂 1. FILE ARCHITECTURE

Sprint 4 introduces Business entities, verification state, and reputation tracking.

backend/
├── src/
│ ├── modules/
│ │ ├── business/
│ │ │ ├── business.controller.ts
│ │ │ ├── business.routes.ts
│ │ │ ├── business.service.ts
│ │ │ ├── business.policy.ts
│ │ │ └── business.types.ts
│ │ ├── reputation/
│ │ │ ├── reputation.service.ts
│ │ │ └── reputation.types.ts
│ │ ├── calls/
│ │ │ └── call.policy.ts (UPDATED)
│ └── tests/
│ ├── business.test.ts
│ └── reputation.test.ts
├── prisma/
│ └── schema.prisma (UPDATED)

🛠 2. DEPENDENCY INJECTION

No new external services.

npm install uuid

📄 3. FILE IMPLEMENTATION
🔹 DATABASE SCHEMA
backend/prisma/schema.prisma (UPDATED)
model Business {
id String @id @default(uuid())
name String
registrationNo String @unique
verified Boolean @default(false)
trustScore Int @default(50)
createdAt DateTime @default(now())
}

model BusinessCaller {
id String @id @default(uuid())
businessId String
phoneNumber String @unique
active Boolean @default(true)

Business Business @relation(fields: [businessId], references: [id])
}

model ReputationEvent {
id String @id @default(uuid())
caller String
delta Int
reason String
createdAt DateTime @default(now())
}

Run migration:

npx prisma migrate dev -n add_business_and_reputation

🔹 BUSINESS DOMAIN
backend/src/modules/business/business.types.ts
export type BusinessVerificationStatus = "UNVERIFIED" | "VERIFIED";

backend/src/modules/business/business.service.ts
import prisma from "../../prismaClient";

export async function registerBusiness(
name: string,
registrationNo: string
) {
return prisma.business.create({
data: { name, registrationNo }
});
}

export async function verifyBusiness(businessId: string) {
return prisma.business.update({
where: { id: businessId },
data: { verified: true }
});
}

export async function findBusinessByCaller(phoneNumber: string) {
return prisma.businessCaller.findUnique({
where: { phoneNumber },
include: { Business: true }
});
}

backend/src/modules/business/business.policy.ts
export function canBusinessCall(
verified: boolean,
trustScore: number
) {
if (!verified) {
return { allowed: false, reason: "BUSINESS_NOT_VERIFIED" };
}

if (trustScore < 20) {
return { allowed: false, reason: "LOW_TRUST_SCORE" };
}

return { allowed: true };
}

backend/src/modules/business/business.controller.ts
import { Request, Response } from "express";
import {
registerBusiness,
verifyBusiness
} from "./business.service";

export async function createBusiness(req: Request, res: Response) {
const { name, registrationNo } = req.body;
const business = await registerBusiness(name, registrationNo);
res.status(201).json(business);
}

export async function approveBusiness(req: Request, res: Response) {
const { businessId } = req.params;
const business = await verifyBusiness(businessId);
res.json(business);
}

backend/src/modules/business/business.routes.ts
import { Router } from "express";
import {
createBusiness,
approveBusiness
} from "./business.controller";

const router = Router();

router.post("/", createBusiness);
router.post("/:businessId/verify", approveBusiness);

export default router;

🔹 REPUTATION ENGINE
backend/src/modules/reputation/reputation.types.ts
export type ReputationReason =
| "SPAM_REPORT"
| "POSITIVE_FEEDBACK"
| "CONSENT_VIOLATION";

backend/src/modules/reputation/reputation.service.ts
import prisma from "../../prismaClient";

export async function applyReputationChange(
caller: string,
delta: number,
reason: string
) {
await prisma.reputationEvent.create({
data: { caller, delta, reason }
});

const businessCaller = await prisma.businessCaller.findUnique({
where: { phoneNumber: caller },
include: { Business: true }
});

if (!businessCaller) return;

await prisma.business.update({
where: { id: businessCaller.businessId },
data: {
trustScore: {
increment: delta
}
}
});
}

🔹 CALL POLICY INTEGRATION
backend/src/modules/calls/call.policy.ts (UPDATED)
import { findBusinessByCaller } from "../business/business.service";
import { canBusinessCall } from "../business/business.policy";
import { evaluateCallPolicy } from "./call.policy.core";

export async function evaluateIncomingCall(
userId: string,
callerNumber: string
) {
const businessCaller = await findBusinessByCaller(callerNumber);

if (businessCaller) {
const decision = canBusinessCall(
businessCaller.Business.verified,
businessCaller.Business.trustScore
);

    if (!decision.allowed) {
      return {
        allow: false,
        reason: decision.reason
      };
    }

}

return evaluateCallPolicy(userId, callerNumber);
}

🧪 4. TEST IMPLEMENTATION
backend/src/tests/business.test.ts
import { canBusinessCall } from "../modules/business/business.policy";

it("blocks unverified business", () => {
const result = canBusinessCall(false, 80);
expect(result.allowed).toBe(false);
});

it("allows verified trusted business", () => {
const result = canBusinessCall(true, 60);
expect(result.allowed).toBe(true);
});

backend/src/tests/reputation.test.ts
import { applyReputationChange } from "../modules/reputation/reputation.service";

it("applies reputation change without error", async () => {
await expect(
applyReputationChange("0810000000", -10, "SPAM_REPORT")
).resolves.not.toThrow();
});

🔐 5. COMPLIANCE & DEFENSIBILITY

Sprint 4 introduces structural defensibility:

Business identity is registered and verified

Trust score is cumulative and irreversible without admin action

Reputation events are immutable

Call permission is policy-driven and auditable

This is where network cooperation + regulatory alignment begin to matter.
