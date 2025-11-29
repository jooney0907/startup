// src/lobby/lobby.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { RealtimeBus, Events } from '../services/realtimeWs';
import './lobby.css';

export function Lobby() {
  const [players, setPlayers] = React.useState([]);
  const [wsStatus, setWsStatus] = React.useState('connecting...');

  React.useEffect(() => {
    let isMounted = true;

    const bus = new RealtimeBus();
    const name = localStorage.getItem('userEmail') || 'Anonymous';

    // --- WebSocket connection status handlers ---
    const handleOpen = () => {
      if (!isMounted) return;
      setWsStatus('connected');

      // Announce that we joined
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

    // --- Messages from other clients ---
    const unsubscribe = bus.subscribe((msg) => {
      if (!isMounted) return;

      if (msg.type === Events.JOIN && msg.payload?.name) {
        setPlayers((prev) => {
          const s = new Set(prev);
          s.add(msg.payload.name);
          return [...s];
        });
      } else if (msg.type === Events.LEAVE && msg.payload?.name) {
        setPlayers((prev) => prev.filter((p) => p !== msg.payload.name));
      }
      // You can handle Events.CHAT etc. here later if you want
    });

    // --- Cleanup on unmount ---
    return () => {
      isMounted = false;

      try {
        // Tell others we left
        bus.send(Events.LEAVE, { name });
      } catch (_) {
        // ignore errors if socket is already closed
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

      <p className="text-muted">
        WebSocket status: <strong>{wsStatus}</strong>
      </p>

      <p className="mb-2">
        When you and your friends open this lobby page, your names will appear here in real time.
      </p>

      <ul className="list-unstyled mb-4">
        {players.length === 0 && (
          <li className="text-muted">
            No other players yet — share the link so they can join the lobby.
          </li>
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
