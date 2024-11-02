import type { ErrorHandler } from "hono";
import type { StatusCode } from "hono/utils/http-status";

import { StatusCodes } from "http-status-codes";


import { createDb } from "@/db";

const onError: ErrorHandler = (err, c) => {
  const { db } = createDb(c.env);
  const currentStatus = "status" in err
    ? err.status
    : c.newResponse(null).status;
  const statusCode = currentStatus !== StatusCodes.OK
    ? (currentStatus as StatusCode)
    : StatusCodes.INTERNAL_SERVER_ERROR;

  const nodeEnv = c.env?.NODE_ENV || c.env.NODE_ENV;
  return c.json(
    {
      message: err.message,
      stack: nodeEnv === "production"
        ? undefined
        : err.stack,
    },
    statusCode,
  );
};

export default onError;
