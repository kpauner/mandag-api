import { z } from "zod";
import { config } from "dotenv";
import { expand } from "dotenv-expand";
import path from "node:path";

expand(config({
  path: path.resolve(
    process.cwd(),
    process.env.NODE_ENV === "test" ? ".env.test" : ".env",
  ),
}));

export const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  PORT: z.coerce.number().default(9999),
  LOG_LEVEL: z.enum(["trace", "debug", "info", "warn", "error", "fatal", "silent"]).default("info"),
  DATABASE_URL: z.string(),
  TURSO_AUTH_TOKEN: z.string().optional(),
}).superRefine((data, ctx) => {
  if (data.NODE_ENV === "production" && !data.TURSO_AUTH_TOKEN) {
    ctx.addIssue({
      code: z.ZodIssueCode.invalid_type,
      expected: "string",
      received: "undefined",
      path: ["TURSO_AUTH_TOKEN"],
      message: "TURSO_AUTH_TOKEN is required in production environment",
    });
  }
});

export type Environment = z.infer<typeof envSchema>;

export function parseEnv(data: any) {
  const { data: env, error } = envSchema.safeParse(data);
  if (error) {
    const errorMessage = `Invalid environment variables: ${Object.entries(error.flatten().fieldErrors).map(([key, value]) => `${key}: ${value}`).join("\n")}`;
    throw new Error(errorMessage);
  }
  return env;
}



