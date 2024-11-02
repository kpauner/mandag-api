import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";


extendZodWithOpenApi(z);

const tasks = sqliteTable("tasks", {
  id: integer({ mode: "number" }).primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),

  email: text("email").unique().notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).default(sql`CURRENT_TIMESTAMP`),
  updatedAt: integer("updated_at", { mode: "timestamp" }).default(sql`CURRENT_TIMESTAMP`).$onUpdate(() => new Date()),
});

export default tasks;

export const SelecttasksSchema = createSelectSchema(tasks, {
  name: z.string().min(1, "required_name").openapi({ example: "Jane Doe" }),
  email: z.string().email("invalid_email").openapi({ example: "jane.doe@example.com" }),
  createdAt: z.coerce.date().openapi({ example: "2023-01-01T00:00:00Z" }),
  updatedAt: z.coerce.date().openapi({ example: "2023-01-01T00:00:00Z" }),
});

export const InserttasksSchema = createInsertSchema(tasks, {
  name: z.string().min(1, "required_name").openapi({ example: "John Smith" }),
  email: z.string().email("invalid_email").openapi({ example: "john.smith@example.com" }),
}).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const patchtasksSchema = InserttasksSchema.partial();
