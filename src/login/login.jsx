import React from 'react';

export function Login() {
  return (
  <main class="container text-center py-5" style="max-width: 600px;">
    <h3>Play now!</h3>

    <form method="get" action="lobby.html" class="text-start">
      <div class="input-group mb-3">
        <input class="form-control" type="text" name="username" placeholder="Username" required />
      </div>

      <div class="input-group mb-4">
        <input class="form-control" type="password" name="password" placeholder="Password" required />
      </div>

      <div class="d-grid gap-2 mb-1">
        <button type="submit" class="btn btn-primary">Login</button>
      </div>
    </form>

    <h3 class="m-0 mt-2 mb-0">Don't have an account? Register now!</h3>
    <div class="d-grid gap-2 mt-1">
      <a href="register.html" class="btn btn-primary">Register</a>
    </div>
  </main>
  );
}