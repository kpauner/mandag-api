import createApp from "@/lib/create-app";

import configureOpenAPI from "./lib/configure-open-api";
import index from "./routes/index.route";
  import tasks from "./routes/tasks/tasks.index";
import { cors } from "hono/cors";

const app = createApp();

app.use('/*', cors({
  origin: ['http://localhost:3000'],
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}))

const routes = [
  index,
  tasks,
] as const;

configureOpenAPI(app);

routes.forEach((route) => {
  app.route("/", route);
});

export type AppType = typeof routes[number];

export default app;
