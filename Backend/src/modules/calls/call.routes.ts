import { Router } from "express";
import { intakeCall, getHistory } from "./call.controller";
import { authenticate } from "../../middleware/auth.middleware";

const router = Router();
router.post("/intake", authenticate, intakeCall);
router.get("/history/:receiverId", authenticate, getHistory);

export default router;
