// service/peerProxy.js
const { WebSocketServer } = require('ws');

class PeerProxy {
  constructor(httpServer) {
    // Create a WebSocket server that hooks into the existing HTTP server
    const wss = new WebSocketServer({ noServer: true });

    // Upgrade HTTP -> WebSocket
    httpServer.on('upgrade', (req, socket, head) => {
      wss.handleUpgrade(req, socket, head, (ws) => {
        wss.emit('connection', ws, req);
      });
    });

    // When a client connects
    wss.on('connection', (ws) => {
      console.log('WebSocket client connected');

      // When a client sends a message, broadcast it to everyone
      ws.on('message', (data) => {
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
