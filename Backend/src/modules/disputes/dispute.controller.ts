import { Request, Response } from "express";
import {
  createDispute,
  resolveDispute,
  getDisputesForBusiness,
} from "./dispute.service";

export async function submitDispute(req: Request, res: Response) {
  const dispute = await createDispute(req.body);
  res.json(dispute);
}

export async function updateDispute(req: Request, res: Response) {
  const { approved } = req.body;
  const dispute = await resolveDispute(req.params.id, approved);
  res.json(dispute);
}

export async function listDisputes(req: Request, res: Response) {
  const disputes = await getDisputesForBusiness(req.params.businessId);
  res.json(disputes);
}
