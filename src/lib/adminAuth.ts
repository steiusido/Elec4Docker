export type AdminCredentials = {
  username: string;
  password: string;
};

function credentialsKey(scopeKey: string) {
  return `admin-credentials:${scopeKey}`;
}

function sessionKey(scopeKey: string) {
  return `admin-session:${scopeKey}`;
}

export function loadAdminCredentials(scopeKey: string): AdminCredentials | null {
  if (typeof window === "undefined") return null;

  const raw = window.localStorage.getItem(credentialsKey(scopeKey));
  if (!raw) return null;

  try {
    return JSON.parse(raw) as AdminCredentials;
  } catch {
    return null;
  }
}

export function saveAdminCredentials(scopeKey: string, credentials: AdminCredentials) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(credentialsKey(scopeKey), JSON.stringify(credentials));
}

export function hasAdminSession(scopeKey: string): boolean {
  if (typeof window === "undefined") return false;
  return window.sessionStorage.getItem(sessionKey(scopeKey)) === "1";
}

export function createAdminSession(scopeKey: string) {
  if (typeof window === "undefined") return;
  window.sessionStorage.setItem(sessionKey(scopeKey), "1");
}

export function clearAdminSession(scopeKey: string) {
  if (typeof window === "undefined") return;
  window.sessionStorage.removeItem(sessionKey(scopeKey));
}
