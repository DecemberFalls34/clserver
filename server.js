import { WebSocketServer } from "ws";

const port = process.env.PORT || 3000;
const wss = new WebSocketServer({ port });

wss.on("connection", ws => {
  ws.on("message", msg => {
    for (const client of wss.clients) {
      if (client.readyState === 1) {
        client.send(msg);
      }
    }
  });

  ws.send(JSON.stringify({
    type: "server",
    message: "Connected to private CloudLink server"
  }));
});

console.log("CloudLink server running on port " + port);
