// src/lobby/lobby.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { RealtimeBus, Events } from '../services/realtimeWs'; // NOTE: ../services
import './lobby.css';

export function Lobby() {
  const [players, setPlayers] = React.useState([]);
  const [wsStatus, setWsStatus] = React.useState('connecting...');
  const [selfName, setSelfName] = React.useState('player');

  React.useEffect(() => {
    let isMounted = true;

    const bus = new RealtimeBus();

    // figure out this user's display name
    const storedName =
      localStorage.getItem('userName') ||
      localStorage.getItem('userEmail') ||
      'player';
    const name = storedName.split('@')[0];
    setSelfName(name);

    // handle JOIN/LEAVE messages from the server
    const handleMessage = (msg) => {
      if (!isMounted || !msg || typeof msg !== 'object') return;
      const { type, payload } = msg;
      if (!payload || !payload.name) return;

      if (type === Events.JOIN) {
        setPlayers((prev) => {
          if (prev.includes(payload.name)) return prev;
          return [...prev, payload.name]; // <-- correct spread
        });
      } else if (type === Events.LEAVE) {
        setPlayers((prev) => prev.filter((p) => p !== payload.name));
      }
    };

    const unsubscribe = bus.subscribe(handleMessage);

    // connection status
    const handleOpen = () => {
      if (!isMounted) return;
      setWsStatus('connected');

      // always add yourself locally
      setPlayers((prev) => {
        if (prev.includes(name)) return prev;
        return [...prev, name];
      });

      // and announce JOIN to others
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

    // cleanup
    return () => {
      isMounted = false;
      try {
        bus.send(Events.LEAVE, { name });
      } catch {
        // socket may already be closed
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

      <p className="mb-1 text-muted">
        WebSocket status: <strong>{wsStatus}</strong>
      </p>

      <p className="mb-3">
        You are logged in as: <strong>{selfName}</strong>
      </p>

      <p className="mb-3">
        When you and your friends open this lobby page, your names will appear
        here in real time.
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
