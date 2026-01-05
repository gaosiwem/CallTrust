import { Router } from "express";
import { fetchSpamInsight } from "./spamScoring.controller";

const router = Router();
router.get("/:businessId", fetchSpamInsight);

export default router;
