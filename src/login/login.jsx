import React from "react";
import { NavLink } from "react-router-dom";

export function Login() {
  return (
    <main className="container text-center" >
      <h3>Play now!</h3>
      <form className="text-start">
        <div className="input-group mb-3">
          <input className="form-control" type="text" name="username" placeholder="Username" required />
        </div>

        <div className="input-group mb-4">
          <input className="form-control" type="password" name="password" placeholder="Password" required />
        </div>

        <div className="d-grid gap-2 mb-1">
          <NavLink to="/lobby" className="btn btn-primary">Login</NavLink>
        </div>
      </form>

      <h3 className="m-0 mt-2 mb-0">Don't have an account? Register now!</h3>
      <div className="d-grid gap-2 mt-1">
        <NavLink to="/register" className="btn btn-primary">Register</NavLink>
      </div>
    </main>
  );
}
