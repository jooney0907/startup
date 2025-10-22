import React from "react";
import { NavLink } from "react-router-dom";
import "./lobby.css";

const PLAYERS = [
  "Timmy", "Jeff", "Sangjoon", "Carlos", "Tyler", "Alyssa",
  "Christian", "Abigail", "Emma", "Gwen", "Izzy", "Emily"
];

export function Lobby() {
  return (
    <main className="container text-center py-5 lobby-main">
      <div className="d-flex justify-content-center align-items-center mb-4 gap-3">
        <h2 className="m-0">Lobby</h2>
        <h2 className="m-0">
          <strong>{PLAYERS.length}</strong> Players
        </h2>
      </div>

      <section>
        <ul id="player-list" className="row list-unstyled">
          {PLAYERS.map((name) => (
            <li key={name} className="col-4 mb-3">{name}</li>
          ))}
        </ul>

        <NavLink to="/game" className="btn btn-primary mt-3">
          Start game
        </NavLink>
      </section>
    </main>
  );
}
