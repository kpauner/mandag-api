import type { DB } from "@/db";

import data from "@/db/seeds/data/tasks.json";

import { tasks } from "../schema";

export default async function seed(db: DB) {
  
  const formattedData: any[] = data.map((item, index) => ({
    id: index + 1,
    name: item.name,
    email: item.email,
  }));
  if (!formattedData) {
    return;
  }
  await db.insert(tasks).values(formattedData);
}
