import http from 'http';
import { WebSocketServer } from 'ws';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 8080;

// 建立 HTTP server（可選，用來保持 Railway 運行）
const server = http.createServer((req, res) => {
  res.writeHead(200);
  res.end('WebSocket server is running');
});

// 建立 WebSocket server
const wss = new WebSocketServer({ server });

const clients = new Set();

wss.on('connection', (ws) => {
  console.log('[WS] New client connected');
  clients.add(ws);

  ws.on('message', (message) => {
    console.log(`[WS] Received: ${message}`);
    // 廣播給所有連線中的 client
    for (const client of clients) {
      if (client.readyState === ws.OPEN) {
        client.send(message.toString());
      }
    }
  });

  ws.on('close', () => {
    console.log('[WS] Client disconnected');
    clients.delete(ws);
  });
});

server.listen(PORT, () => {
  console.log(`WS server on :${PORT}`);
});
