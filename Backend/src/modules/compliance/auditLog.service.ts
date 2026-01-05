import prisma from "../../prismaClient";
import { AuditEvent } from "./compliance.types";

export async function logAuditEvent(event: AuditEvent) {
  return prisma.auditLog.create({
    data: {
      actorId: event.actorId,
      action: event.action,
      entity: event.entity,
      metadata: event.metadata || {},
    },
  });
}
