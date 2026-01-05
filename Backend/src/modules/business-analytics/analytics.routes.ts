import { Router } from "express";
import { fetchAnalytics } from "./analytics.controller";

const router = Router();
router.get("/:businessId", fetchAnalytics);

export default router;
