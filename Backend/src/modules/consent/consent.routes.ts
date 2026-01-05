import { Router } from "express";
import { grant, revoke } from "./consent.controller";
import { authenticate } from "../../middleware/auth.middleware";

const router = Router();

router.post("/grant", authenticate, grant);
router.post("/revoke", authenticate, revoke);

export default router;
