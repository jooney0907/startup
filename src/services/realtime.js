export const Events = {
  NEW_QUESTION: "NEW_QUESTION",
  RESET: "RESET",
  END: "END",
  ANSWER: "ANSWER", 
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
