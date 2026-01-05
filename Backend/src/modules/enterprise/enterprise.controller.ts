import { Request, Response } from "express";
import { createOrUpdateEnterprise } from "./enterprise.service";

export async function upsertEnterprise(req: Request, res: Response) {
  const { businessId, slaTier, webhookUrl } = req.body;
  const record = await createOrUpdateEnterprise(
    businessId,
    slaTier,
    webhookUrl
  );
  res.json(record);
}
