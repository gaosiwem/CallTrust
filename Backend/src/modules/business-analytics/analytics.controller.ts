import { Request, Response } from "express";
import { getBusinessAnalytics } from "./analytics.service";

export async function fetchAnalytics(req: Request, res: Response) {
  const businessId = req.params.businessId;
  const data = await getBusinessAnalytics(businessId);
  res.json(data);
}
