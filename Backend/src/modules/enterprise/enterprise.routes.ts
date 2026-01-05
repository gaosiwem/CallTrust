import { Router } from "express";
import { upsertEnterprise } from "./enterprise.controller";

const router = Router();
router.post("/setup", upsertEnterprise);

export default router;
