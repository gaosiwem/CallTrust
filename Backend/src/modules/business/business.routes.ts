import { Router } from "express";
import { createBusiness, approveBusiness } from "./business.controller";

const router = Router();

router.post("/", createBusiness);
router.post("/:businessId/verify", approveBusiness);

export default router;
