import createApp from "@/lib/create-app";

import configureOpenAPI from "./lib/configure-open-api";
import index from "./routes/index.route";
  import threats from "./routes/threats/threats.index";

const app = createApp();

const routes = [
  index,
  threats,
] as const;

configureOpenAPI(app);

routes.forEach((route) => {
  app.route("/", route);
});

export type AppType = typeof routes[number];

export default app;
