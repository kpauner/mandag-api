import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";

import * as schema from "@/db/schema";
import { Environment } from "@/env";

export function createDb(env: Environment) {
const client = createClient({
  url: env.DATABASE_URL as string,
  authToken: env.TURSO_AUTH_TOKEN as string,
});

const db = drizzle(client, { logger: true, schema });

return { db, client };
}

export type DB = ReturnType<typeof createDb>['db'];
