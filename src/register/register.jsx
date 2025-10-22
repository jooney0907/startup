import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./register.css";

export function Register() {
  const navigate = useNavigate();
  const [userName, setUserName] = React.useState("");
  const [password, setPassword] = React.useState("");

  function createUser(e) {
    e.preventDefault();
    if (!userName || !password) return;
    localStorage.setItem("userName", userName);
    navigate("/lobby");
  }

  return (
    <main className="container text-center py-5 login-main">
      <h3>Sign up!</h3>

      <form className="text-start" onSubmit={createUser}>
        <div className="input-group mb-3">
          <input
            className="form-control"
            type="text"
            name="username"
            placeholder="Username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
        </div>

        <div className="input-group mb-4">
          <input
            className="form-control"
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="d-grid gap-2 mb-1">
          <button type="submit" className="btn btn-primary" disabled={!userName || !password}>
            Sign up
          </button>
        </div>
      </form>

      <h3 className="m-0 mt-2 mb-0">Already have an account?</h3>
      <div className="d-grid gap-2 mt-1">
        <NavLink to="/" className="btn btn-primary">Log in</NavLink>
      </div>
    </main>
  );
}

