import { createRoute, z } from "@hono/zod-openapi";

import { InsertThreatsSchema, patchThreatsSchema, SelectThreatsSchema } from "@/db/schema/threats";
import { notFoundSchema } from "@/lib/constants";
import jsonContent from "@/openapi/helpers/json-content";
import jsonContentOneOf from "@/openapi/helpers/json-content-one-of";
import jsonContentRequired from "@/openapi/helpers/json-content-required";
import createErrorSchema from "@/openapi/schemas/create-error-schema";
import IdParamsSchema from "@/openapi/schemas/id-params.js";


const tags = ["Threats"];

export const list = createRoute({
  method: "get",
  path: "/threats",
  tags,
  responses: {
    200: jsonContent(z.array(SelectThreatsSchema), "List of all threats"),
  },
});

export const create = createRoute({
  method: "post",
  path: "/threats",
  tags,
  request: {
    body: jsonContentRequired(InsertThreatsSchema, "Threat to create"),
  },
  responses: {
    200: jsonContent(SelectThreatsSchema, "Threat created successfully"),
    422: jsonContent(createErrorSchema(InsertThreatsSchema), "Validation error"),
  },

});

export const getOne = createRoute({
  method: "get",
  path: "/threats/{id}",
  request: {
    params: IdParamsSchema,
  },
  tags,
  responses: {
    200: jsonContent(SelectThreatsSchema, "Threat found"),
    422: jsonContent(createErrorSchema(IdParamsSchema), "Validation error"),
    404: jsonContent(notFoundSchema, "Threat not found"),
  },
});

// TODO READ https://www.speakeasy.com/post/openapi-tips-oneof-allof-anyof

export const patch = createRoute({
  method: "patch",
  path: "/threats/{id}",
  tags,
  request: {
    params: IdParamsSchema,
    body: jsonContentRequired(patchThreatsSchema, "Threat to update"),
  },
  responses: {
    200: jsonContent(SelectThreatsSchema, "Threat updated successfully"),
    422: jsonContentOneOf([createErrorSchema(IdParamsSchema), createErrorSchema(patchThreatsSchema)], "Validation error"),
    404: jsonContent(notFoundSchema, "Threat not found"),
  },
});

export const remove = createRoute({
  method: "delete",
  path: "/threats/{id}",
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
