import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Game } from './game/game';
import { Register } from './register/register';
import { About } from './about/about';
import { Lobby } from './lobby/lobby';
import { Scores } from './scores/scores';




export default function App() {
  return (
    <BrowserRouter>
      <div className="body bg-dark text-light d-flex flex-column min-vh-100">
        <header>
          <h1>
            Quiztopia<sup>®</sup>
          </h1>
          <nav className="nav">
            <NavLink className="nav-link" to="/scores">High Scores</NavLink>
            <NavLink className="nav-link" to="/" end>Home</NavLink>
            <NavLink className="nav-link" to="/about">About</NavLink>
          </nav>
          <hr />
        </header>

        {/* Render routes inside main */}
        <main className="container text-center py-5" style={{ maxWidth: 600 }}>
          <Routes>
            <Route path="/game" element={<Game />} />
            <Route path="/scores" element={<Scores />} />
            <Route path="/about" element={<About />} />
            <Route path="/lobby" element={<Lobby />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        <footer className="container py-4 mt-auto">
          <hr className="border-secondary" />
          <div className="d-flex justify-content-end">
            <a className="text-reset" href="https://github.com/jooney0907/startup">GitHub</a>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}
function NotFound() {
  return <main className="container-fluid bg-secondary text-center">404: Return to sender. Address unknown.</main>;
}