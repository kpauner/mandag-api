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

export type Env = z.infer<typeof envSchema>;

function loadEnv(): Env {
  try {
    // eslint-disable-next-line node/no-process-env
    const env = envSchema.parse(process.env);
    return env;
  }
  catch (e) {
    const error = e as z.ZodError;
    console.error("Invalid environment variables:", error.flatten().fieldErrors);
    process.exit(1);
  }
}

const env = loadEnv();

export default env;
