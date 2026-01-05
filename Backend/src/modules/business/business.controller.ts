import { Request, Response } from "express";
import { registerBusiness, verifyBusiness } from "./business.service";

export async function createBusiness(req: Request, res: Response) {
  const { name, registrationNo } = req.body;
  const business = await registerBusiness(name, registrationNo);
  res.status(201).json(business);
}

export async function approveBusiness(req: Request, res: Response) {
  const { businessId } = req.params;
  const business = await verifyBusiness(businessId);
  res.json(business);
}
