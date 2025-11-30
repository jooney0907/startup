export const GameEvent = {
  System: "system",
  End: "gameEnd",
  Start: "gameStart",
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
    const protocol = window.location.protocol === "http:" ? "ws" : "wss";
    const socketUrl =
      window.location.hostname === "localhost"
        ? `${protocol}://localhost:4000/ws`
        : `${protocol}://${window.location.host}/ws`;

    console.log("Connecting WS to", socketUrl);
    this.socket = new WebSocket(socketUrl);

    this.socket.onopen = () => {
      console.log("WS connected");
    };

    this.socket.onclose = () => {
      console.log("WS disconnected");
    };

    this.socket.onerror = (err) => {
      console.error("WS error", err);
    };

    this.socket.onmessage = async (msg) => {
      try {
        const event = JSON.parse(await msg.data.text());
        this.receiveEvent(event);
      } catch (e) {
        console.error("Bad WS message", e);
      }
    };
  }
  broadcastEvent(from, type, value) {
    const event = new EventMessage(from, type, value);

    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(event));
    }

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
export const GameNotifier = new GameEventNotifier();
