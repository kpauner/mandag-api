import { testClient } from "hono/testing";
import { execSync } from "node:child_process";
import fs from "node:fs";
import { afterAll, beforeAll, describe, expect, expectTypeOf, it } from "vitest";

import env from "@/env-runtime";
import createApp, { createTestApp } from "@/lib/create-app";

import router from "./threats.index";

if (env.NODE_ENV !== "test") {
  throw new Error("NODE_ENV must be 'test'");
}

const client = testClient(createApp().route("/", router));

describe("threats routes", () => {
  beforeAll(async () => {
    execSync("bun run drizzle-kit push");
  });

  afterAll(async () => {
    fs.rmSync("test.db", { force: true });
  });

  it("should return a list of threats with pagination", async () => {
    const response = await client.threats.$get({ query: { page: 1, limit: 10 } });
    const json = await response.json();
    expectTypeOf(json).toBeArray();
  });
});
