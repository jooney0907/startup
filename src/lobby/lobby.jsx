// src/lobby/lobby.jsx
import React from "react";
import { GameEvent, GameNotifier } from "../game/gameNotifier";
import "../game/players.css";

export function Lobby() {
  const [events, setEvents] = React.useState([]);
  const [userName, setUserName] = React.useState("");

  // Get username from localStorage (same as your game)
  React.useEffect(() => {
    const raw =
      localStorage.getItem("userEmail") ||
      localStorage.getItem("userName") ||
      "player";
    setUserName(raw);
  }, []);

  // Hook into GameNotifier once the username exists
  React.useEffect(() => {
    if (!userName) return;

    function handleGameEvent(event) {
      setEvents((prev) => [...prev, event]);
    }

    // Connect listener
    GameNotifier.addHandler(handleGameEvent);

    // Announce join
    GameNotifier.broadcastEvent(userName, GameEvent.System, {
      msg: "connected",
    });

    // Cleanup on unmount → announce leave
    return () => {
      GameNotifier.broadcastEvent(userName, GameEvent.System, {
        msg: "disconnected",
      });
      GameNotifier.removeHandler(handleGameEvent);
    };
  }, [userName]);

  // Display messages like Simon
  function renderMessages() {
    return events.map((event, i) => {
      if (event.type !== GameEvent.System) return null;

      const fromName = event.from
        ? event.from.split("@")[0]
        : "Unknown";

      return (
        <div key={i} className="event">
          <span className="player-event">{fromName}</span>
          {event.value?.msg}
        </div>
      );
    });
  }

  return (
    <div className="players">
      <div className="player-name">Lobby</div>
      <div id="player-messages">{renderMessages()}</div>
    </div>
  );
}
