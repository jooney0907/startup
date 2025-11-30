// service/peerProxy.js
const { WebSocketServer } = require('ws');

function peerProxy(httpServer) {
  const socketServer = new WebSocketServer({ server: httpServer });

  socketServer.on('connection', (socket) => {
    socket.isAlive = true;

    // Forward messages to everyone (including the sender, which is fine)
    socket.on('message', (data) => {
      for (const client of socketServer.clients) {
        if (client.readyState === socket.OPEN) {
          client.send(data);
        }
      }
    });

    socket.on('pong', () => {
      socket.isAlive = true;
    });
  });

  // Ping clients to keep them alive
  setInterval(() => {
    for (const client of socketServer.clients) {
      if (client.isAlive === false) {
        client.terminate();
        continue;
      }
      client.isAlive = false;
      client.ping();
    }
  }, 10000);
}

module.exports = { peerProxy };
