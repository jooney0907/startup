// service/peerProxy.js
const { WebSocketServer } = require('ws');

class PeerProxy {
  constructor(httpServer) {
    const wss = new WebSocketServer({ noServer: true });

    httpServer.on('upgrade', (req, socket, head) => {
      // Only handle WebSocket upgrades on /ws
      if (req.url === '/ws') {
        wss.handleUpgrade(req, socket, head, (ws) => {
          wss.emit('connection', ws, req);
        });
      } else {
        socket.destroy();
      }
    });

    wss.on('connection', (ws) => {
      console.log('WebSocket client connected');

      ws.on('message', (data) => {
        console.log('WS broadcast:', data.toString());
        for (const client of wss.clients) {
          if (client.readyState === ws.OPEN) {
            client.send(data);
          }
        }
      });

      ws.on('close', () => {
        console.log('WebSocket client disconnected');
      });
    });

    this.wss = wss;
  }
}

function peerProxy(httpServer) {
  return new PeerProxy(httpServer);
}

module.exports = { peerProxy };
