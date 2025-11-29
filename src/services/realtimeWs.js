// src/services/realtimeWs.js

export const Events = {
  JOIN: 'JOIN',
  LEAVE: 'LEAVE',
  CHAT: 'CHAT',
  // You can add more later (e.g., NEW_QUESTION, ANSWER)
};

export class RealtimeBus {
  constructor() {
    const protocol = window.location.protocol === 'https:' ? 'wss' : 'ws';

    // IMPORTANT:
    // This assumes your frontend is served by the same origin as the backend
    // (e.g., deployed version, or Vite dev proxy).
    const url = `${protocol}://${window.location.host}`;

    this.socket = new WebSocket(url);
    this.handlers = new Set();

    this.socket.addEventListener('open', () => {
      console.log('WebSocket connected');
    });

    this.socket.addEventListener('message', (ev) => {
      try {
        const msg = JSON.parse(ev.data);
        this.handlers.forEach((h) => h(msg));
      } catch (err) {
        console.error('Bad WebSocket message', err);
      }
    });

    this.socket.addEventListener('close', () => {
      console.log('WebSocket closed');
    });

    this.socket.addEventListener('error', (err) => {
      console.error('WebSocket error', err);
    });
  }

  send(type, payload = {}) {
    const msg = { type, payload, ts: Date.now() };

    const sendNow = () => this.socket.send(JSON.stringify(msg));

    if (this.socket.readyState === WebSocket.OPEN) {
      sendNow();
    } else {
      this.socket.addEventListener('open', () => sendNow(), { once: true });
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
