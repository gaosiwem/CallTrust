import { Router } from "express";
import { getSubscription } from "./subscription.controller";

const router = Router();

router.get("/", getSubscription);
router.get("/:userId", getSubscription); // Fallback for easier testing

export default router;
