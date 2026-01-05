import { Router } from "express";
import {
  submitDispute,
  updateDispute,
  listDisputes,
} from "./dispute.controller";

const router = Router();

router.post("/", submitDispute);
router.patch("/:id", updateDispute);
router.get("/business/:businessId", listDisputes);

export default router;
