import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { ENV } from "../config/env";

export function authenticate(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).end();

  try {
    req.user = jwt.verify(token, ENV.JWT_SECRET);
    next();
  } catch {
    res.status(401).end();
  }
}
