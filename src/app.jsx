import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Game } from './game/game';
import { Register } from './register/register';
import { About } from './about/about';
import { Lobby } from './lobby/lobby';
import { Scores } from './scores/scores'

export default function App() {
  return (
    <div className="body bg-dark text-light">
      <header>
        <h1>
          Quiztopia<sup>®</sup>
        </h1>
        <nav className="nav">
          <a className="nav-link" href="scores.html">High Scores</a>
          <a className="nav-link" href="index.html">Home</a>
          <a className="nav-link" href="about.html">About</a>
        </nav>
        <hr />
      </header>

      <main className="container text-center py-5" style={{ maxWidth: 600 }}>
        <h3>Play now!</h3>

        <form method="get" action="lobby.html" className="text-start">
          <div className="input-group mb-3">
            <input className="form-control" type="text" name="username" placeholder="Username" required />
          </div>

          <div className="input-group mb-4">
            <input className="form-control" type="password" name="password" placeholder="Password" required />
          </div>

          <div className="d-grid gap-2 mb-1">
            <button type="submit" className="btn btn-primary">Login</button>
          </div>
        </form>

        <h3 className="m-0 mt-2 mb-0">Don't have an account? Register now!</h3>
        <div className="d-grid gap-2 mt-1">
          <a href="register.html" className="btn btn-primary">Register</a>
        </div>
      </main>

      <footer className="container py-4">
        <hr className="border-secondary" />
        <div className="d-flex justify-content-end">
          <a className="text-reset" href="https://github.com/jooney0907/startup">GitHub</a>
        </div>
      </footer>
    </div>
  );
}
