// src/services/realtime.js
// Lightweight per-room event bus using BroadcastChannel (multi-tab demo).
// In production, replace with WebSocket/Socket.io/Pusher/etc.

export const Events = {
  NEW_QUESTION: "NEW_QUESTION",
  RESET: "RESET",
  END: "END",
  ANSWER: "ANSWER", // reserved for later
};

export class RealtimeBus {
  constructor(room = "default") {
    this.room = room;
    this.channel = new BroadcastChannel(`quiztopia-${room}`);
  }
  send(type, payload = {}) {
    this.channel.postMessage({ type, payload, ts: Date.now() });
  }
  subscribe(handler) {
    const fn = (ev) => handler(ev.data);
    this.channel.addEventListener("message", fn);
    return () => this.channel.removeEventListener("message", fn);
  }
  close() {
    this.channel.close();
  }
}
