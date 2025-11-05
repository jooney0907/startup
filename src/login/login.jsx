import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { loginUser, logoutUser } from "../services/authClient.js";

export function Login() {
  const navigate = useNavigate();
  const [userName, setUserName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isAuthed, setIsAuthed] = React.useState(false);
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    const saved = localStorage.getItem("userName") || "";
    if (saved) {
      setUserName(saved);
      setIsAuthed(true);
    }
  }, []);

  async function handleLogout() {
    try {
      await logoutUser();
    } catch (err) {
      console.error(err);
    } finally {
      localStorage.removeItem("userName");
      setUserName("");
      setPassword("");
      setIsAuthed(false);
    }
  }

  async function handleLogin(e) {
    e.preventDefault();
    if (!userName || !password) return;

    try {
      setError("");
      const data = await loginUser(userName, password); // backend uses "email"
      localStorage.setItem("userName", data.email);
      setIsAuthed(true);
      navigate("/lobby");
    } catch (err) {
      console.error(err);
      setError("Invalid username or password");
      setIsAuthed(false);
    }
  }

  const shortName = (userName || "player").split("@")[0];

  return (
    <main className="container d-flex flex-column align-items-center justify-content-center min-vh-100">
      {!isAuthed ? (
        <>
          <h3 className="mb-4">Login</h3>

          <form
            className="text-start"
            onSubmit={handleLogin}
            style={{ maxWidth: 360, width: "100%" }}
          >
            <div className="input-group mb-3">
              <input
                className="form-control"
                type="text"
                name="username"
                placeholder="Email"
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

            {error && <div className="alert alert-danger py-1">{error}</div>}

            <div className="d-grid gap-2 mb-1">
              <button type="submit" className="btn btn-primary" disabled={!userName || !password}>
                Login
              </button>
            </div>
          </form>

          <h3 className="m-0 mt-3 mb-1">Don't have an account? Register now!</h3>
          <div className="d-grid gap-2" style={{ maxWidth: 360, width: "100%" }}>
            <NavLink to="/register" className="btn btn-primary">Register</NavLink>
          </div>
        </>
      ) : (
        <div className="text-center">
          <h2 className="mb-3">welcome {shortName}!</h2>
          <div className="d-grid gap-2" style={{ maxWidth: 220, margin: "0 auto" }}>
            <button className="btn btn-primary" onClick={() => navigate("/lobby")}>
              Play
            </button>
            <button className="btn btn-outline-secondary" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
