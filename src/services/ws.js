// src/services/realtimeWs.js

export const Events = {
  JOIN: 'JOIN',
  LEAVE: 'LEAVE',
  CHAT: 'CHAT',
  // You can add NEW_QUESTION, ANSWER, etc later if you want
};

export class RealtimeBus {
  constructor() {
    const protocol = window.location.protocol === 'https:' ? 'wss' : 'ws';
    // peerProxy attaches to the same HTTP server, so this URL is enough
    const url = `${protocol}://${window.location.host}`;

    this.socket = new WebSocket(url);
    this.handlers = new Set();

    this.socket.addEventListener('message', (event) => {
      try {
        const msg = JSON.parse(event.data);
        this.handlers.forEach((h) => h(msg));
      } catch (e) {
        console.error('Bad WS message', e);
      }
    });
  }

  send(type, payload = {}) {
    const msg = { type, payload, ts: Date.now() };
    if (this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(msg));
    } else {
      // small buffer: wait until open, then send once
      this.socket.addEventListener(
        'open',
        () => this.socket.send(JSON.stringify(msg)),
        { once: true },
      );
    }
  }

  subscribe(handler) {
    this.handlers.add(handler);
    return () => this.handlers.delete(handler);
  }

  close() {
    this.socket.close();
  }
}
