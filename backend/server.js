// backend/server.js
import http from 'http';
import { WebSocketServer } from 'ws';

const PORT = process.env.PORT || 8080;
const server = http.createServer();
const wss = new WebSocketServer({ server });

const clients = new Set();

wss.on('connection', (ws) => {
  clients.add(ws);

  ws.on('message', (msg) => {
    // 最小化廣播：收到任何文字就原樣廣播
    for (const client of clients) {
      if (client.readyState === client.OPEN) {
        client.send(msg.toString());
      }
    }
  });

  ws.on('close', () => clients.delete(ws));
});

// 健康檢查 (可選)
server.on('request', (req, res) => {
  if (req.url === '/health') {
    res.writeHead(200).end('ok');
  } else {
    res.writeHead(404).end('not found');
  }
});

server.listen(PORT, () => {
  console.log(`WS server on :${PORT}`);
});
