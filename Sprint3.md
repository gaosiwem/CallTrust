SPRINT HANDOVER: Sprint 3 – AI Risk Scoring & Call Classification Engine

Source: ChatGPT-Generated Architectures
Instruction Mode: Execution / Fast-Track

📂 1. FILE ARCHITECTURE

Sprint 3 adds a scoring engine and integrates it into the call decision pipeline.

backend/
├── src/
│ ├── modules/
│ │ ├── scoring/
│ │ │ ├── scoring.engine.ts
│ │ │ ├── scoring.service.ts
│ │ │ └── scoring.types.ts
│ │ ├── calls/
│ │ │ └── call.policy.ts (UPDATED)
│ ├── tests/
│ │ └── scoring.test.ts
│ └── app.ts (NO CHANGE)
├── prisma/
│ └── schema.prisma (UPDATED)

🛠 2. DEPENDENCY INJECTION

No new external services. Pure backend logic.

npm install dayjs

📄 3. FILE IMPLEMENTATION
backend/prisma/schema.prisma (UPDATED)
model CallScore {
id String @id @default(uuid())
callerNumber String
score Int
riskLevel String
calculatedAt DateTime @default(now())
}

Run migration:

npx prisma migrate dev -n add_call_scoring

backend/src/modules/scoring/scoring.types.ts
export type RiskLevel = "LOW" | "MEDIUM" | "HIGH";

export interface ScoringInput {
callerNumber: string;
spamReports: number;
hasConsent: boolean;
callAttemptsLast24h: number;
}

backend/src/modules/scoring/scoring.engine.ts
import { RiskLevel, ScoringInput } from "./scoring.types";

export function calculateRiskScore(input: ScoringInput): {
score: number;
riskLevel: RiskLevel;
} {
let score = 0;

score += input.spamReports \* 15;

if (!input.hasConsent) {
score += 25;
}

if (input.callAttemptsLast24h > 3) {
score += (input.callAttemptsLast24h - 3) \* 10;
}

let riskLevel: RiskLevel = "LOW";

if (score >= 60) riskLevel = "HIGH";
else if (score >= 30) riskLevel = "MEDIUM";

return { score, riskLevel };
}

This engine is deterministic, auditable, and ML-replaceable.

backend/src/modules/scoring/scoring.service.ts
import prisma from "../../prismaClient";
import dayjs from "dayjs";
import { calculateRiskScore } from "./scoring.engine";

export async function scoreCaller(
userId: string,
callerNumber: string,
spamReports: number,
hasConsent: boolean
) {
const since = dayjs().subtract(24, "hour").toDate();

const attempts = await prisma.callLog.count({
where: {
callerNumber,
createdAt: { gte: since }
}
});

const result = calculateRiskScore({
callerNumber,
spamReports,
hasConsent,
callAttemptsLast24h: attempts
});

await prisma.callScore.create({
data: {
callerNumber,
score: result.score,
riskLevel: result.riskLevel
}
});

return result;
}

backend/src/modules/calls/call.policy.ts (UPDATED)
import { hasActiveConsent } from "../consent/consent.service";
import { spamReportCount } from "../spam/spam.service";
import { scoreCaller } from "../scoring/scoring.service";

export async function evaluateCallPolicy(
userId: string,
callerNumber: string
) {
const consent = await hasActiveConsent(userId, callerNumber);
const spamCount = await spamReportCount(callerNumber);

const score = await scoreCaller(
userId,
callerNumber,
spamCount,
consent
);

if (score.riskLevel === "HIGH") {
return {
allow: false,
reason: "HIGH_RISK_CALL",
score
};
}

return {
allow: true,
score
};
}

🧪 4. TEST IMPLEMENTATION
backend/src/tests/scoring.test.ts
import { calculateRiskScore } from "../modules/scoring/scoring.engine";

it("assigns LOW risk correctly", () => {
const result = calculateRiskScore({
callerNumber: "0810000000",
spamReports: 0,
hasConsent: true,
callAttemptsLast24h: 1
});

expect(result.riskLevel).toBe("LOW");
});

it("assigns MEDIUM risk correctly", () => {
const result = calculateRiskScore({
callerNumber: "0810000001",
spamReports: 2,
hasConsent: false,
callAttemptsLast24h: 2
});

expect(result.riskLevel).toBe("MEDIUM");
});

it("assigns HIGH risk correctly", () => {
const result = calculateRiskScore({
callerNumber: "0810000002",
spamReports: 4,
hasConsent: false,
callAttemptsLast24h: 6
});

expect(result.riskLevel).toBe("HIGH");
});

🧠 5. ARCHITECTURAL GUARANTEES

Sprint 3 guarantees:

Deterministic AI scoring with full explainability

Audit trail stored in database

Drop-in replacement path for Python ML models later

No coupling to UI or mobile

Python can later expose a /score service and replace calculateRiskScore without breaking contracts.
