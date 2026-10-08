
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "@/lib/prisma";

export const auth = betterAuth({
  secret: process.env.BETTER_AUTH_SECRET || "default_dev_secret_key_tripcraft_ai_123456",
  database: prismaAdapter(prisma as any, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
  },
});
