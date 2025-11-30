const { WebSocketServer } = require('ws');

function peerProxy(httpServer) {
  const socketServer = new WebSocketServer({ server: httpServer });

  socketServer.on('connection', (socket) => {
    socket.isAlive = true;
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
