import { Request, Response } from "express";
import { getSpamInsight } from "./spamScoring.service";

export async function fetchSpamInsight(req: Request, res: Response) {
  const businessId = req.params.businessId;
  const insight = await getSpamInsight(businessId);
  res.json(insight);
}
