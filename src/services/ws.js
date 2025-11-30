export const Events = {
  JOIN: 'JOIN',
  LEAVE: 'LEAVE',
  CHAT: 'CHAT',
};

export class RealtimeBus {
  constructor() {
    const protocol = window.location.protocol === 'https:' ? 'wss' : 'ws';
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
}
