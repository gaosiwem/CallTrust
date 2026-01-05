import { Router } from "express";
import { startSubscription, confirmSubscription } from "./payments.controller";

const router = Router();

router.post("/start", startSubscription);
router.post("/confirm", confirmSubscription);

export default router;
