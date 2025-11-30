// src/play/gameNotifier.js (or wherever this file lives)
const GameEvent = {
  System: 'system',
  End: 'gameEnd',
  Start: 'gameStart',
};

class EventMessage {
  constructor(from, type, value) {
    this.from = from;
    this.type = type;
    this.value = value;
  }
}

class GameEventNotifier {
  events = [];
  handlers = [];

  constructor() {
    const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
    const host = window.location.host; // works with your proxy/dev setup
    this.socket = new WebSocket(`${protocol}://${host}/ws`);

    this.socket.onopen = () => {
      console.log('WS connected');
    };

    this.socket.onclose = () => {
      console.log('WS disconnected');
    };

    this.socket.onmessage = async (msg) => {
      try {
        const event = JSON.parse(await msg.data.text());
        this.receiveEvent(event);
      } catch (e) {
        console.error('Bad WS message', e);
      }
    };
  }

  broadcastEvent(from, type, value) {
    const event = new EventMessage(from, type, value);

    // send to server so other clients see it
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(event));
    }

    // also deliver locally so the sender sees their own event immediately
    this.receiveEvent(event);
  }

  addHandler(handler) {
    this.handlers.push(handler);
  }

  removeHandler(handler) {
    this.handlers = this.handlers.filter((h) => h !== handler);
  }

  receiveEvent(event) {
    this.events.push(event);
    this.handlers.forEach((handler) => handler(event));
  }
}

const GameNotifier = new GameEventNotifier();
export { GameEvent, GameNotifier };
