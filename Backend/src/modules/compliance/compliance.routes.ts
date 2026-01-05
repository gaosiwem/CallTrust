import { Router } from "express";
import { updateConsent } from "./compliance.controller";

const router = Router();
router.post("/consent", updateConsent);

export default router;
