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
    schema.tasks,

  ]) {
    // if (table === schema.tasks) {
    //   console.log("tasks", table.name);
    // }
    await db.delete(table);
  }

  await seeds.tasks(db);
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
