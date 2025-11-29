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

    // Create WebSocket bus
    const bus = new RealtimeBus();

    // Figure out a display name
    const storedName =
      localStorage.getItem('userName') ||
      localStorage.getItem('userEmail') ||
      'player';
    const name = storedName.split('@')[0];

    // ---- connection status handlers ----
    const handleOpen = () => {
      if (!isMounted) return;
      setWsStatus('connected');
      // announce join
      bus.send(Events.JOIN, { name });
    };

    const handleClose = () => {
      if (!isMounted) return;
      setWsStatus('disconnected');
    };

    const handleError = (err) => {
      console.error('WebSocket error', err);
      if (!isMounted) return;
      setWsStatus('error');
    };

    bus.socket.addEventListener('open', handleOpen);
    bus.socket.addEventListener('close', handleClose);
    bus.socket.addEventListener('error', handleError);

    // ---- handle JOIN / LEAVE messages ----
    const unsubscribe = bus.subscribe((msg) => {
      if (!isMounted || !msg || typeof msg !== 'object') return;
      const { type, payload } = msg;
      if (!payload || !payload.name) return;

      if (type === Events.JOIN) {
        setPlayers((prev) => {
          if (prev.includes(payload.name)) return prev;
          return [...prev, payload.name];
        });
      } else if (type === Events.LEAVE) {
        setPlayers((prev) => prev.filter((p) => p !== payload.name));
      }
    });

    // ---- cleanup on unmount ----
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
    <main className="container py-4 lobby text-center">
      <h1 className="mb-3">Lobby</h1>

      <p className="text-muted mb-2">
        WebSocket status: <strong>{wsStatus}</strong>
      </p>

      <p className="mb-3">
        When you and your friends open this lobby page, your names will appear here in real time.
      </p>

      <p className="mb-2">
        Players online: <strong>{players.length}</strong>
      </p>

      <ul className="list-unstyled mb-4">
        {players.length === 0 && (
          <li className="text-muted">No players yet — share the lobby link!</li>
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
