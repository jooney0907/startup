// src/game/gameNotifier.js

// Event types used across the app
export const GameEvent = {
  System: "system",
  End: "gameEnd",
  Start: "gameStart",
};

// Message envelope sent over WebSocket
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

    // 🔑 IMPORTANT:
    // In dev (localhost) talk directly to the backend on port 4000.
    // In production, use the same host as the page.
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

  // Send an event to everyone via the server, and also locally
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

// ✅ IMPORTANT: use the *class name* here, not itself.
// If you had `new GameNotifier()` before, that would crash the module.
export const GameNotifier = new GameEventNotifier();
