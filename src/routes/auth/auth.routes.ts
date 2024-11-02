import { createRoute, z } from "@hono/zod-openapi";

import { InserttasksSchema, patchtasksSchema, SelecttasksSchema } from "@/db/schema/tasks";
import { notFoundSchema } from "@/lib/constants";
import jsonContent from "@/openapi/helpers/json-content";
import jsonContentOneOf from "@/openapi/helpers/json-content-one-of";
import jsonContentRequired from "@/openapi/helpers/json-content-required";
import createErrorSchema from "@/openapi/schemas/create-error-schema";
import IdParamsSchema from "@/openapi/schemas/id-params.js";


const tags = ["tasks"];

export const list = createRoute({
  method: "get",
  path: "/tasks",
  tags,
  responses: {
    200: jsonContent(z.array(SelecttasksSchema), "List of all tasks"),
  },
});

export const create = createRoute({
  method: "post",
  path: "/tasks",
  tags,
  request: {
    body: jsonContentRequired(InserttasksSchema, "Threat to create"),
  },
  responses: {
    200: jsonContent(SelecttasksSchema, "Threat created successfully"),
    422: jsonContent(createErrorSchema(InserttasksSchema), "Validation error"),
  },

});

export const getOne = createRoute({
  method: "get",
  path: "/tasks/{id}",
  request: {
    params: IdParamsSchema,
  },
  tags,
  responses: {
    200: jsonContent(SelecttasksSchema, "Threat found"),
    422: jsonContent(createErrorSchema(IdParamsSchema), "Validation error"),
    404: jsonContent(notFoundSchema, "Threat not found"),
  },
});

// TODO READ https://www.speakeasy.com/post/openapi-tips-oneof-allof-anyof

export const patch = createRoute({
  method: "patch",
  path: "/tasks/{id}",
  tags,
  request: {
    params: IdParamsSchema,
    body: jsonContentRequired(patchtasksSchema, "Threat to update"),
  },
  responses: {
    200: jsonContent(SelecttasksSchema, "Threat updated successfully"),
    422: jsonContentOneOf([createErrorSchema(IdParamsSchema), createErrorSchema(patchtasksSchema)], "Validation error"),
    404: jsonContent(notFoundSchema, "Threat not found"),
  },
});

export const remove = createRoute({
  method: "delete",
  path: "/tasks/{id}",
  tags,
  request: {
    params: IdParamsSchema,
  },
  responses: {
    204: {
      description: "Threat deleted successfully",
    },
    404: jsonContent(notFoundSchema, "Threat not found"),
    422: jsonContent(createErrorSchema(IdParamsSchema), "Invalid ID"),
  },
});

export type ListRoute = typeof list;
export type CreateRoute = typeof create;
export type GetOneRoute = typeof getOne;
export type PatchRoute = typeof patch;
export type RemoveRoute = typeof remove;
