import React from 'react';
import { NavLink } from 'react-router-dom';
import { RealtimeBus, Events } from '../services/realtimeWs';
import './lobby.css';

export function Lobby() {
  const [players, setPlayers] = React.useState([]);
  const [wsStatus, setWsStatus] = React.useState('connecting...');

  React.useEffect(() => {
    const bus = new RealtimeBus();
    const name =
      (localStorage.getItem('userName') ||
        localStorage.getItem('userEmail') ||
        'player').split('@')[0];

    // When we get any message from the socket
    const unsubscribe = bus.subscribe((msg) => {
      const { type, payload } = msg;

      if (type === Events.JOIN || type === Events.LEAVE) {
        setPlayers((prev) => {
          const set = new Set(prev);

          if (type === Events.JOIN) {
            set.add(payload.name);
          } else if (type === Events.LEAVE) {
            set.delete(payload.name);
          }

          return Array.from(set);
        });
      }
    });

    // When socket opens, announce that we joined
    bus.socket.addEventListener('open', () => {
      setWsStatus('connected');
      bus.send(Events.JOIN, { name });
    });

    bus.socket.addEventListener('close', () => {
      setWsStatus('disconnected');
    });

    // On unmount, announce that we left, then clean up
    return () => {
      bus.send(Events.LEAVE, { name });
      unsubscribe();
      bus.close();
    };
  }, []);

  return (
    <main className="container text-center py-5">
      <div className="mb-2">
        <small>WebSocket status: {wsStatus}</small>
      </div>

      <div className="d-flex justify-content-center align-items-center mb-4 gap-3">
        <h2 className="m-0">Lobby</h2>
        <h2 className="m-0">
          <strong>{players.length}</strong> Players Online
        </h2>
      </div>

      <section>
        <ul className="row list-unstyled">
          {players.map((p) => (
            <li key={p} className="col-4 mb-3">
              {p}
            </li>
          ))}
        </ul>

        <NavLink to="/game" className="btn btn-primary mt-3">
          Start game
        </NavLink>
      </section>
    </main>
  );
}
