
import mongo from "@prisma/orm-mongo/runtime";
import { contractFromJson } from "@prisma/orm-mongo/static";
import type { Contract } from "../prisma/contract.d";
import contractJson from "../prisma/contract.json" with {
  type: "json",
};

const contract = contractFromJson<Contract>(contractJson);

const globalForPrisma = globalThis as unknown as {
  prisma: ReturnType<typeof mongo<Contract>> | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  mongo({
    contract,
    url: process.env.DATABASE_URL!,
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
