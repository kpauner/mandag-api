import type { DB } from "@/db";

import data from "@/db/seeds/data/tasks.json";

import { tasks } from "../schema";
import { Task } from "../schema/tasks";
import { User } from "../schema/users";

export default async function seed(db: DB) {
  
  const today = new Date();
    const minHour = 6;  // 6 AM
    const maxHour = 22; // 10 PM
    const randomHour = Math.floor(Math.random() * (maxHour - minHour)) + minHour;
    const randomMinutes = Math.floor(Math.random() * 60);
    today.setHours(randomHour, randomMinutes, 0, 0);
    
  const formattedData: Omit<Task, "id" | "createdAt" | "updatedAt">[] = data.map((item, index) => ({
    name: item.name,
    description: item.description,
    type: item.type,
    duration: item.duration,
    startAt: today,
    recurring: item.recurring,
    userId: item.userId,
  }));
  if (!formattedData) {
    return;
  }
  await db.insert(tasks).values(formattedData);
}
