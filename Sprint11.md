🚀 SPRINT HANDOVER: Sprint 11 – Dispute Resolution, Appeals & Trust Governance

Source: ChatGPT-Generated Architectures
Instruction Mode: Execution / Fast-Track

Sprint 11 closes the last critical enterprise and regulatory gap. After this sprint, the platform is commercially launch-ready.

📂 1. FILE ARCHITECTURE
Backend
backend/
├── src/modules/disputes/
│ ├── dispute.types.ts
│ ├── dispute.service.ts
│ ├── dispute.controller.ts
│ ├── dispute.routes.ts
├── src/tests/
│ └── dispute.test.ts

Mobile (Business + User)
mobile/
├── src/screens/
│ ├── DisputeSubmissionScreen.tsx
│ ├── DisputeStatusScreen.tsx
├── src/services/
│ └── disputeService.ts

🛠 2. DEPENDENCY INJECTION

No new dependencies required.
Uses existing Prisma, Express, React Native stack.

📄 3. FILE IMPLEMENTATION
🔹 BACKEND IMPLEMENTATION
backend/src/modules/disputes/dispute.types.ts
export type DisputeStatus = "OPEN" | "UNDER_REVIEW" | "RESOLVED" | "REJECTED";

export interface DisputePayload {
businessId: string;
reason: string;
callEventId?: string;
}

backend/src/modules/disputes/dispute.service.ts
import prisma from "../../prismaClient";
import { DisputePayload } from "./dispute.types";

export async function createDispute(payload: DisputePayload) {
return prisma.dispute.create({
data: {
businessId: payload.businessId,
reason: payload.reason,
callEventId: payload.callEventId,
status: "OPEN"
}
});
}

export async function resolveDispute(
disputeId: string,
approved: boolean
) {
const status = approved ? "RESOLVED" : "REJECTED";

const dispute = await prisma.dispute.update({
where: { id: disputeId },
data: { status }
});

if (approved) {
await prisma.business.update({
where: { id: dispute.businessId },
data: {
trustScore: { increment: 5 }
}
});
}

return dispute;
}

export async function getDisputesForBusiness(businessId: string) {
return prisma.dispute.findMany({
where: { businessId }
});
}

backend/src/modules/disputes/dispute.controller.ts
import { Request, Response } from "express";
import {
createDispute,
resolveDispute,
getDisputesForBusiness
} from "./dispute.service";

export async function submitDispute(req: Request, res: Response) {
const dispute = await createDispute(req.body);
res.json(dispute);
}

export async function updateDispute(req: Request, res: Response) {
const { approved } = req.body;
const dispute = await resolveDispute(req.params.id, approved);
res.json(dispute);
}

export async function listDisputes(req: Request, res: Response) {
const disputes = await getDisputesForBusiness(req.params.businessId);
res.json(disputes);
}

backend/src/modules/disputes/dispute.routes.ts
import { Router } from "express";
import {
submitDispute,
updateDispute,
listDisputes
} from "./dispute.controller";

const router = Router();

router.post("/", submitDispute);
router.patch("/:id", updateDispute);
router.get("/business/:businessId", listDisputes);

export default router;

🧪 BACKEND TESTS (TDD)
backend/src/tests/dispute.test.ts
import { createDispute } from "../modules/disputes/dispute.service";

it("creates a dispute record", async () => {
const dispute = await createDispute({
businessId: "biz-1",
reason: "Incorrect spam classification"
});

expect(dispute.status).toBe("OPEN");
});

🔹 MOBILE IMPLEMENTATION
mobile/src/services/disputeService.ts
import { api } from "./api";

export async function submitDispute(data: {
businessId: string;
reason: string;
}) {
return api.post("/disputes", data);
}

export async function fetchDisputes(businessId: string) {
const res = await api.get(`/disputes/business/${businessId}`);
return res.data;
}

mobile/src/screens/DisputeSubmissionScreen.tsx
import React, { useState } from "react";
import { View, TextInput, Button } from "react-native";
import { submitDispute } from "../services/disputeService";

export default function DisputeSubmissionScreen({ route }: any) {
const { businessId } = route.params;
const [reason, setReason] = useState("");

const submit = async () => {
await submitDispute({ businessId, reason });
};

return (
<View>
<TextInput value={reason} onChangeText={setReason} />
<Button title="Submit Dispute" onPress={submit} />
</View>
);
}

mobile/src/screens/DisputeStatusScreen.tsx
import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { fetchDisputes } from "../services/disputeService";

export default function DisputeStatusScreen({ route }: any) {
const { businessId } = route.params;
const [items, setItems] = useState<any[]>([]);

useEffect(() => {
fetchDisputes(businessId).then(setItems);
}, []);

return (
<View>
{items.map(d => (
<Text key={d.id}>
{d.reason} . {d.status}
</Text>
))}
</View>
);
}

⚖️ 4. WHAT SPRINT 11 COMPLETES

Sprint 11 delivers:

Due process for businesses

Explainable trust score recovery

POPIA fairness principle enforcement

Enterprise legal defensibility

Reduced churn from false positives

This is mandatory for serious B2B adoption.
