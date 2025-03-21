import { createServer, Model } from "miragejs";

export function makeServer() {
  const server = createServer({
    models: {
      user: Model,
    },

    seeds(server) {
      server.create("user", { name: "John Doe", email: "john@example.com" });
      server.create("user", { name: "Jane Smith", email: "jane@example.com" });
    },

    routes() {
      this.namespace = "api";

      this.get("/users", (schema) => {
        return schema.users.all();
      });

      this.post("/users", (schema, request) => {
        let attrs = JSON.parse(request.requestBody);
        return schema.users.create(attrs);
      });

      this.delete("/users/:id", (schema, request) => {
        let id = request.params.id;

        return schema.users.find(id).destroy();
      });
    },
  });

  return server;
}
