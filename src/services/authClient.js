const BASE = "/api";

async function handleJson(res) {
  const text = await res.text();
  let data = null;

  if (text) {
    try {
      data = JSON.parse(text);
    } catch (e) {
      console.error("Failed to parse JSON from response", e);
    }
  }

  if (!res.ok) {
    const msg = data && data.msg ? data.msg : `Request failed with status ${res.status}`;
    throw new Error(msg);
  }

  return data;
}

export async function registerUser(email, password) {
  const res = await fetch(`${BASE}/auth/create`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ email, password }),
  });

  const data = await handleJson(res);

  // 👇 store the email so the lobby can read it
  localStorage.setItem("userEmail", data.email || email);

  return data;
}

export async function loginUser(email, password) {
  const res = await fetch(`${BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ email, password }),
  });

  const data = await handleJson(res);

  // 👇 store the email on successful login
  localStorage.setItem("userEmail", data.email || email);

  return data;
}

export async function logoutUser() {
  const res = await fetch(`${BASE}/auth/logout`, {
    method: "DELETE",
    credentials: "include",
  });

  // 👇 clear the stored email on logout
  localStorage.removeItem("userEmail");

  if (!res.ok && res.status !== 204) {
    throw new Error("Logout failed");
  }
}

export async function fetchScores() {
  const res = await fetch(`${BASE}/scores`, {
    method: "GET",
    credentials: "include",
  });

  return handleJson(res);
}

export async function submitScore(score) {
  const res = await fetch(`${BASE}/score`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(score),
  });

  return handleJson(res);
}
