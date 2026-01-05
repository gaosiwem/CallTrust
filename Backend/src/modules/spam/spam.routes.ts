import { Router } from "express";
import { report } from "./spam.controller";
import { authenticate } from "../../middleware/auth.middleware";

const router = Router();

router.post("/report", authenticate, report);

export default router;
