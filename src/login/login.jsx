import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

export function Login() {
  const navigate = useNavigate();
  const [userName, setUserName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isAuthed, setIsAuthed] = React.useState(false);

  // Hydrate from localStorage like Simon
  React.useEffect(() => {
    const saved = localStorage.getItem("userName") || "";
    if (saved) {
      setUserName(saved);
      setIsAuthed(true);
    }
  }, []);

  function handleLogout() {
    localStorage.removeItem("userName");
    setPassword("");
    setIsAuthed(false);
  }

  function loginUser(e) {
    e.preventDefault();
    if (!userName || !password) return;
    localStorage.setItem("userName", userName);
    setIsAuthed(true);
    navigate("/lobby");
  }

  return (
    <main className="container text-center">
      <h3>Play now!</h3>

      {!isAuthed ? (
        <>
          <form className="text-start" onSubmit={loginUser}>
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
                Login
              </button>
            </div>
          </form>

          <h3 className="m-0 mt-2 mb-0">Don't have an account? Register now!</h3>
          <div className="d-grid gap-2 mt-1">
            <NavLink to="/register" className="btn btn-primary">Register</NavLink>
          </div>
        </>
      ) : (
        // Authenticated view (Simon-style)
        <div className="d-grid gap-2 mt-3">
          <div className="h5">Welcome, <span className="fw-semibold">{userName}</span></div>
          <button className="btn btn-primary" onClick={() => navigate("/lobby")}>Play</button>
          <button className="btn btn-outline-secondary" onClick={handleLogout}>Logout</button>
        </div>
      )}
    </main>
  );
}
