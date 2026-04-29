const KEY = "ks_user";
const USERS = "ks_users";

export interface User { email: string; name: string; }

export function getUser(): User | null {
  if (typeof window === "undefined") return null;
  try { const raw = localStorage.getItem(KEY); return raw ? JSON.parse(raw) : null; } catch { return null; }
}

export function login(email: string, _password: string): User {
  const user = { email, name: email.split("@")[0] || "Driver" };
  localStorage.setItem(KEY, JSON.stringify(user));
  return user;
}

export function signup(email: string, password: string, name?: string): User {
  const users = JSON.parse(localStorage.getItem(USERS) || "[]");
  const user = { email, name: name || email.split("@")[0] || "Driver" };
  users.push({ ...user, password });
  localStorage.setItem(USERS, JSON.stringify(users));
  localStorage.setItem(KEY, JSON.stringify(user));
  return user;
}

export function logout() { localStorage.removeItem(KEY); }

export function randomCreds() {
  const adj = ["fast", "dark", "swift", "ghost", "neo", "shadow", "blaze"];
  const noun = ["driver", "rider", "racer", "pilot", "wolf"];
  const a = adj[Math.floor(Math.random()*adj.length)];
  const n = noun[Math.floor(Math.random()*noun.length)];
  const num = Math.floor(Math.random()*999);
  return { email: `${a}.${n}${num}@koenigsegg.dev`, password: Math.random().toString(36).slice(2,12) };
}
