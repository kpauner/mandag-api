import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { users } from "./index";

extendZodWithOpenApi(z);

const tasks = sqliteTable("tasks", {
  id: integer({ mode: "number" }).primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  description: text("description"),
  type: text("type").notNull().default("task"),
  startAt: integer("start_at", { mode: "timestamp" }).notNull(),
  duration: integer("duration").notNull(),
  recurring: text("recurring").$type<string[]>().notNull().default(["none"]),
  userId: integer("user_id").notNull().references(() => users.id),
  createdAt: integer("created_at", { mode: "timestamp" }).default(sql`CURRENT_TIMESTAMP`),
  updatedAt: integer("updated_at", { mode: "timestamp" }).default(sql`CURRENT_TIMESTAMP`).$onUpdate(() => new Date()),
});

export default tasks;

export const SelecttasksSchema = createSelectSchema(tasks, {
  name: z.string().min(1, "required_name").openapi({ example: "Do the dishes" }),
  description: z.string().openapi({ example: "jane.doe@example.com" }),
  recurring: z.string().array().openapi({ example: ["none"] }),
  createdAt: z.coerce.date().openapi({ example: "2023-01-01T00:00:00Z" }),
  updatedAt: z.coerce.date().openapi({ example: "2023-01-01T00:00:00Z" }),
});

export const InserttasksSchema = createInsertSchema(tasks, {
  name: z.string().min(1, "required_name").openapi({ example: "Do the dishes" }),
  description: z.string().openapi({ example: "Write description" }),
}).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const patchtasksSchema = InserttasksSchema.partial();

export type InsertTask = typeof tasks.$inferInsert;
export type Task = typeof tasks.$inferSelect;

