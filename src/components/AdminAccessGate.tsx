import { useMemo, useState, type ReactNode } from "react";
import {
  createAdminSession,
  hasAdminSession,
  loadAdminCredentials,
  saveAdminCredentials,
  clearAdminSession,
} from "../lib/adminAuth";

type AdminAccessGateProps = {
  scopeKey: string;
  title: string;
  children: (controls: { logout: () => void }) => ReactNode;
};

export default function AdminAccessGate({
  scopeKey,
  title,
  children,
}: AdminAccessGateProps) {
  const existing = useMemo(() => loadAdminCredentials(scopeKey), [scopeKey]);

  const [authenticated, setAuthenticated] = useState(() => hasAdminSession(scopeKey));
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const isFirstTimeSetup = !existing;

  const logout = () => {
    clearAdminSession(scopeKey);
    setAuthenticated(false);
  };

  if (authenticated) {
    return <>{children({ logout })}</>;
  }

  const onCreateCredentials = () => {
    if (!username.trim() || !password) {
      setError("Username and password are required.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    saveAdminCredentials(scopeKey, {
      username: username.trim(),
      password,
    });

    createAdminSession(scopeKey);
    setAuthenticated(true);
    setError("");
  };

  const onLogin = () => {
    const credentials = loadAdminCredentials(scopeKey);

    if (!credentials) {
      setError("No credentials found. Refresh and create credentials.");
      return;
    }

    if (credentials.username !== username.trim() || credentials.password !== password) {
      setError("Invalid username or password.");
      return;
    }

    createAdminSession(scopeKey);
    setAuthenticated(true);
    setError("");
  };

  return (
    <div className="min-h-screen bg-gray-100 grid place-items-center px-6 py-10">
      <div className="w-full max-w-md rounded-2xl border bg-white p-6">
        <p className="text-xs font-semibold tracking-[0.14em] text-gray-500">ADMIN ACCESS</p>
        <h1 className="mt-2 text-2xl font-black text-gray-900">{title}</h1>

        {isFirstTimeSetup ? (
          <>
            <p className="mt-3 text-sm text-gray-600">
              First-time setup. Create username + password for this admin page.
            </p>
            <div className="mt-5 space-y-3">
              <Field label="Username">
                <input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full rounded-lg border px-3 py-2"
                />
              </Field>
              <Field label="Password">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-lg border px-3 py-2"
                />
              </Field>
              <Field label="Confirm Password">
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full rounded-lg border px-3 py-2"
                />
              </Field>
            </div>
            <button
              type="button"
              onClick={onCreateCredentials}
              className="mt-5 w-full rounded-full bg-[#a90000] px-5 py-2 text-sm font-semibold text-white hover:bg-[#8f0000]"
            >
              Create Credentials
            </button>
          </>
        ) : (
          <>
            <p className="mt-3 text-sm text-gray-600">Enter your admin credentials.</p>
            <div className="mt-5 space-y-3">
              <Field label="Username">
                <input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full rounded-lg border px-3 py-2"
                />
              </Field>
              <Field label="Password">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-lg border px-3 py-2"
                />
              </Field>
            </div>
            <button
              type="button"
              onClick={onLogin}
              className="mt-5 w-full rounded-full bg-[#a90000] px-5 py-2 text-sm font-semibold text-white hover:bg-[#8f0000]"
            >
              Login
            </button>
          </>
        )}

        {error && <p className="mt-4 text-sm text-red-700">{error}</p>}
      </div>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-semibold text-gray-800">{label}</span>
      {children}
    </label>
  );
}
