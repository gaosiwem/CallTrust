import express from "express";
import authRoutes from "./modules/auth/auth.routes";
import callRoutes from "./modules/calls/call.routes";
import consentRoutes from "./modules/consent/consent.routes";
import spamRoutes from "./modules/spam/spam.routes";
import adminRoutes from "./modules/admin/admin.routes";
import paymentRoutes from "./modules/payments/payments.routes";
import analyticsRoutes from "./modules/business-analytics/analytics.routes";
import spamMlRoutes from "./modules/spam-ml/spamScoring.routes";
import complianceRoutes from "./modules/compliance/compliance.routes";
import enterpriseRoutes from "./modules/enterprise/enterprise.routes";
import disputeRoutes from "./modules/disputes/dispute.routes";
import subscriptionRoutes from "./modules/subscriptions/subscription.routes";

const app = express();
import cors from "cors";
app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/calls", callRoutes);
app.use("/consent", consentRoutes);
app.use("/spam", spamRoutes);
app.use("/admin", adminRoutes);
app.use("/payments", paymentRoutes);
app.use("/business-analytics", analyticsRoutes);
app.use("/spam-insight", spamMlRoutes);
app.use("/compliance", complianceRoutes);
app.use("/enterprise", enterpriseRoutes);
app.use("/disputes", disputeRoutes);
app.use("/subscription", subscriptionRoutes);

export default app;
