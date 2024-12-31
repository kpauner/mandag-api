# Task Management API

A modern REST API built with Hono and TypeScript, deployed on Cloudflare Workers.

- OpenAPI documentation using `@hono/zod-openapi`
- Type-safe request/response handling with Zod schemas
- SQL database integration with Drizzle ORM
- RESTful endpoints for task management (CRUD operations)
- Read-only mode in production for demonstration purposes

## API Endpoints

- `GET /tasks` - List all tasks
- `GET /tasks/{id}` - Get a specific task
- `POST /tasks` - Create a new task
- `PATCH /tasks/{id}` - Update a task
- `DELETE /tasks/{id}` - Delete a task

## Tech Stack

- [Hono](https://hono.dev/) - Lightweight, ultrafast web framework
- [Drizzle ORM](https://orm.drizzle.team/) - TypeScript ORM
- [@hono/zod-openapi](https://github.com/honojs/middleware/tree/main/packages/zod-openapi) - OpenAPI integration
- [Cloudflare Workers](https://workers.cloudflare.com/) - Edge runtime
- [TypeScript](https://www.typescriptlang.org/) - Type safety and developer experience

The API is deployed as a read-only demo, with full OpenAPI documentation available through Scalar.
