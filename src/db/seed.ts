import * as schema from "@/db/schema";
import env from "@/env-runtime";

import { createDb } from ".";
import * as seeds from "./seeds";

if (env.NODE_ENV !== "development") {
  throw new Error("You must set NODE_ENV to \"development\" when running seeds");
}

async function seedDatabase() {
  const { db } = createDb(env);
  for (const table of [
    schema.threats,

  ]) {
    // if (table === schema.threats) {
    //   console.log("threats", table.name);
    // }
    await db.delete(table);
  }

  await seeds.threats(db);
}

seedDatabase()
  .catch((err) => {
    console.error("Error seeding database:", err);
    process.exit(1);
  })
  .finally(async () => {
    console.log("Seeding complete");
    process.exit(0);
  });
