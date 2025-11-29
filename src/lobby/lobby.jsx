// src/lobby/lobby.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
// If your file is src/services/ws.js use this:
import { RealtimeBus, Events } from '../services/realtimeWs';
// If you renamed the file to realtimeWs.js instead, use:
// import { RealtimeBus, Events } from '../services/realtimeWs';

import './lobby.css';

export function Lobby() {
  const [players, setPlayers] = React.useState([]);
  const [wsStatus, setWsStatus] = React.useState('connecting...');

  React.useEffect(() => {
    let isMounted = true;

    const bus = new RealtimeBus();
    const name = localStorage.getItem('userEmail') || 'Anonymous';

    const handleOpen = () => {
      if (!isMounted) return;
      setWsStatus('connected');
      // tell others we joined
      bus.send(Events.JOIN, { name });
    };

    const handleClose = () => {
      if (!isMounted) return;
      setWsStatus('disconnected');
    };

    const handleError = () => {
      if (!isMounted) return;
      setWsStatus('error');
    };

    bus.socket.addEventListener('open', handleOpen);
    bus.socket.addEventListener('close', handleClose);
    bus.socket.addEventListener('error', handleError);

    // Handle incoming JOIN / LEAVE
    const unsubscribe = bus.subscribe((msg) => {
      if (!isMounted) return;
      console.log('WS message:', msg);

      if (msg.type === Events.JOIN && msg.payload?.name) {
        setPlayers((prev) => {
          const s = new Set(prev);
          s.add(msg.payload.name);
          return [...s];
        });
      } else if (msg.type === Events.LEAVE && msg.payload?.name) {
        setPlayers((prev) => prev.filter((p) => p !== msg.payload.name));
      }
    });

    return () => {
      isMounted = false;
      try {
        bus.send(Events.LEAVE, { name });
      } catch {
        // ignore if socket already closed
      }
      unsubscribe();
      bus.socket.removeEventListener('open', handleOpen);
      bus.socket.removeEventListener('close', handleClose);
      bus.socket.removeEventListener('error', handleError);
      bus.close();
    };
  }, []);

  return (
    <main className="container py-4 lobby">
      <h1 className="mb-3">Lobby</h1>

      <p className="text-muted mb-1">
        WebSocket status: <strong>{wsStatus}</strong>
      </p>

      <p className="mb-3">
        When you and your friends open this lobby page, your names will appear here in real time.
      </p>

      <ul className="list-unstyled mb-4">
        {players.length === 0 && (
          <li className="text-muted">No players connected yet.</li>
        )}
        {players.map((p) => (
          <li key={p}>{p}</li>
        ))}
      </ul>

      <NavLink to="/game" className="btn btn-primary">
        Start Game
      </NavLink>
    </main>
  );
}
