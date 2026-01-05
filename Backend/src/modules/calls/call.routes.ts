import { Router } from "express";
import { intakeCall } from "./call.controller";
import { authenticate } from "../../middleware/auth.middleware";

const router = Router();
router.post("/intake", authenticate, intakeCall);

export default router;
