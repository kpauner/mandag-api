import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";


const users = sqliteTable('users', {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  email: text('email').notNull(),
  password: text('password').notNull(),
});

export type InsertUser = typeof users.$inferInsert;
export type User = typeof users.$inferSelect;

export default users;

export const sessions = sqliteTable('sessions', {
    id: text('id').primaryKey().notNull(),
    userId: integer('user_id').notNull().references(() => users.id),
    expiresAt: integer("expires_at", {
      mode: "timestamp"
    }).notNull()
});

export type InsertSession = typeof sessions.$inferInsert;
export type Session = typeof sessions.$inferSelect;

