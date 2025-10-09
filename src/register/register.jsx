import React from 'react';
import './register.css'
export function Register() {
  return (
<main className="container text-center py-5 login-main">
    <h3>Sign up!</h3>

    <form method="get" action="lobby.html" className="text-start">
      <div className="input-group mb-3">
        <input className="form-control" type="text" name="username" placeholder="Username" required />
      </div>

      <div className="input-group mb-4">
        <input class="form-control" type="password" name="password" placeholder="Password" required />
      </div>

      <div className="d-grid gap-2 mb-1">
        <button type="submit" className="btn btn-primary">Login</button>
      </div>
    </form>

    <h3 className="m-0 mt-2 mb-0">Already have an account?</h3>
    <div className="d-grid gap-2 mt-1">
      <a href="index.html" className="btn btn-primary">Log in</a>
    </div>
  </main>
  );
}