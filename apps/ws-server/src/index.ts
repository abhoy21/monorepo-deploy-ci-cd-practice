import { prisma } from "@repo/db/client";

Bun.serve({
  port: 8080,
  fetch(req, server) {
    if (server.upgrade(req)) {
      return;
    }

    return new Response("Failed to upgrade to WebSocket");
  },
  websocket: {
    async message(ws, message: string) {
      ws.send(message);
      const user = await prisma.user.findMany();
      ws.send(JSON.stringify(user));
    },
  },
});
