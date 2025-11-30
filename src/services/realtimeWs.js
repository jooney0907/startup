export const Events = {
  JOIN: 'JOIN',
  LEAVE: 'LEAVE',
  CHAT: 'CHAT',
};

export class RealtimeBus {
  constructor() {
    const protocol = window.location.protocol === 'https:' ? 'wss' : 'ws';
    const host = window.location.host;

    let url;
    if (host.startsWith('localhost')) {
      url = `${protocol}://localhost:4000/ws`;
    } else {
      url = `${protocol}://${host}/ws`;
    }

    this.socket = new WebSocket(url);
    this.handlers = new Set();

    this.socket.addEventListener('open', () => {
      console.log('WebSocket connected to', url);
    });

    this.socket.addEventListener('message', (event) => {
      try {
        const msg = JSON.parse(event.data);
        console.log('WS message from server:', msg);
        this.handlers.forEach((h) => h(msg));
      } catch (e) {
        console.error('Bad WS message', e);
      }
    });

    this.socket.addEventListener('close', () => {
      console.log('WebSocket closed');
    });

    this.socket.addEventListener('error', (e) => {
      console.error('WebSocket error', e);
    });
  }

  send(type, payload = {}) {
    const msg = { type, payload, ts: Date.now() };
    const data = JSON.stringify(msg);

    if (this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(data);
    } else {
      const onOpen = () => {
        this.socket.removeEventListener('open', onOpen);
        this.socket.send(data);
      };
      this.socket.addEventListener('open', onOpen);
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
