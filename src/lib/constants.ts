import { NOT_FOUND } from "@/lib/http-status-phrases";
import createMessageObjectSchema from "@/openapi/schemas/create-message-schema";

export const notFoundSchema = createMessageObjectSchema(NOT_FOUND);
