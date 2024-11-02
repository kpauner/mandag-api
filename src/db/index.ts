import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";

import * as schema from "@/db/schema";
import env from "@/env";

export const client = createClient({
  url: env.DATABASE_URL as string,
  authToken: env.TURSO_AUTH_TOKEN as string,
});

export const db = drizzle(client, { logger: true, schema });

export type DB = typeof db;
