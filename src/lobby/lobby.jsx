// src/lobby/lobby.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { GameEvent, GameNotifier } from "../game/gameNotifier";
import "../game/players.css";

export function Lobby() {
  const [events, setEvents] = React.useState([]);
  const [userName, setUserName] = React.useState("");
  const navigate = useNavigate();

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

    GameNotifier.addHandler(handleGameEvent);

    GameNotifier.broadcastEvent(userName, GameEvent.System, {
      msg: "connected",
    });

    return () => {
      GameNotifier.broadcastEvent(userName, GameEvent.System, {
        msg: "disconnected",
      });
      GameNotifier.removeHandler(handleGameEvent);
    };
  }, [userName]);

  // Start button -> go to the React route for your game
  function handleStartGame() {
    if (userName) {
      GameNotifier.broadcastEvent(userName, GameEvent.Start, {
        msg: "started a new game",
      });
    }

    // 👇 change "/game" to whatever your actual route is
    navigate("/game");
  }

  function renderMessages() {
    return events.map((event, i) => {
      let message = "unknown";
      if (event.type === GameEvent.End) {
        message = `scored ${event.value.score}`;
      } else if (event.type === GameEvent.Start) {
        message = `started a new game`;
      } else if (event.type === GameEvent.System) {
        message = event.value.msg;
      }

      const fromName = event.from ? event.from.split("@")[0] : "Unknown";

      return (
        <div key={i} className="event">
          <span className="player-event">{fromName}</span>
          {message}
        </div>
      );
    });
  }

  return (
    <div className="players">
      <div>
        Player <span className="player-name">{userName}</span>
      </div>
      <div id="player-messages">{renderMessages()}</div>

      <div style={{ marginTop: "1rem", textAlign: "center" }}>
        <button className="btn btn-primary" onClick={handleStartGame}>
          Start Game
        </button>
      </div>
    </div>
  );
}
