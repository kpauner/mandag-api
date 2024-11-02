import { eq } from "drizzle-orm";

import type { AppRouteHandler } from "@/lib/types";

import {createDb} from "@/db";
import { threats } from "@/db/schema";
import { NOT_FOUND } from "@/lib/http-status-phrases";

import type { CreateRoute, GetOneRoute, ListRoute, PatchRoute, RemoveRoute } from "./threats.routes";

export const list: AppRouteHandler<ListRoute> = async (c) => {
  const { db } = createDb(c.env);
  const threats = await db.query.threats.findMany();
  return c.json(threats);
};

export const create: AppRouteHandler<CreateRoute> = async (c) => {
  const { db } = createDb(c.env);
  const body = c.req.valid("json");
  const [inserted] = await db.insert(threats).values(body).returning();
  return c.json(inserted, 200);
};

export const getOne: AppRouteHandler<GetOneRoute> = async (c) => {
  const { db } = createDb(c.env);
  const { id } = c.req.valid("param");
  const data = await db.query.threats.findFirst({
    where(fields, operators) {
      return operators.eq(fields.id, id);
    },
  });
  if (!data) {
    return c.json({ message: NOT_FOUND }, 404);
  }
  return c.json(data, 200);
};

export const patch: AppRouteHandler<PatchRoute> = async (c) => {
  const { db } = createDb(c.env);
  const { id } = c.req.valid("param");
  const updates = c.req.valid("json");
  const [data] = await db.update(threats).set(updates).where(eq(threats.id, id)).returning();
  if (!data) {
    return c.json({ message: NOT_FOUND }, 404);
  }
  return c.json(data, 200);
};

export const remove: AppRouteHandler<RemoveRoute> = async (c) => {
  const { db } = createDb(c.env);
  const { id } = c.req.valid("param");

  const result = await db.delete(threats).where(eq(threats.id, id));
  if (result.rowsAffected === 0) {
    return c.json({ message: NOT_FOUND }, 404);
  }
  return c.json(null, 204);
};
