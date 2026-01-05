import { Router } from "express";
import { checkBusinessAbuse } from "./admin.controller";

const router = Router();

router.post("/abuse-check", checkBusinessAbuse);

export default router;
