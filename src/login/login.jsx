import React from "react";
import { NavLink } from "react-router-dom";

export function Login() {
  return (
    <main className="container text-center py-5" style={{ maxWidth: "600px" }}>
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
        <NavLink to="/register" className="btn btn-primary">Register</NavLink>
      </div>
    </main>
  );
}
