import { handleAbuse } from "../modules/admin/admin.service";
import prisma from "../prismaClient";

jest.setTimeout(15000);

it("returns correct action for spam thresholds", async () => {
  const action = await handleAbuse("0810000000");
  expect(["TEMP_BLOCK", "PERM_BLOCK", "WARN_BUSINESS"]).toContain(action);
});
