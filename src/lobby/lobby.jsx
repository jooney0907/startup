// src/lobby/Lobby.jsx
import React from 'react';
import { GameEvent, GameNotifier } from '../play/gameNotifier';
import './players.css';

export function Lobby(props) {
  const userName = props.userName;

  const [events, setEvents] = React.useState([]);

  React.useEffect(() => {
    GameNotifier.addHandler(handleGameEvent);

    // announce join
    GameNotifier.broadcastEvent(userName, GameEvent.System, { msg: "connected" });

    return () => {
      GameNotifier.broadcastEvent(userName, GameEvent.System, { msg: "disconnected" });
      GameNotifier.removeHandler(handleGameEvent);
    };
  }, []);

  function handleGameEvent(event) {
    setEvents((prev) => [...prev, event]);
  }

  function renderMessages() {
    return events.map((event, i) => {
      let message = '';

      if (event.type === GameEvent.System) {
        message = event.value.msg;
      }

      return (
        <div key={i} className="event">
          <span className="player-event">{event.from.split('@')[0]}</span>
          {message}
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
