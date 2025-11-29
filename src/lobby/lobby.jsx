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

    const storedName =
      localStorage.getItem('userName') ||
      localStorage.getItem('userEmail') ||
      'player';

    const name = storedName.split('@')[0];

    const handleMessage = (msg) => {
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
    };

    const unsubscribe = bus.subscribe(handleMessage);

    const handleOpen = () => {
      if (!isMounted) return;
      setWsStatus('connected');
      bus.send(Events.JOIN, { name });
    };

    const handleClose = () => {
      if (!isMounted) return;
      setWsStatus('disconnected');
    };

    const handleError = (e) => {
      console.error('WebSocket error', e);
      if (!isMounted) return;
      setWsStatus('error');
    };

    bus.socket.addEventListener('open', handleOpen);
    bus.socket.addEventListener('close', handleClose);
    bus.socket.addEventListener('error', handleError);

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
    <main className="container text-center py-5">
      <p className="text-muted mb-2">WebSocket status: {wsStatus}</p>

      <h2 className="mb-3">Lobby</h2>
      <p className="mb-3">
        Players online: <strong>{players.length}</strong>
      </p>

      <ul className="list-unstyled mb-4">
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
