"use client";
import { signIn } from "next-auth/react";
import { FormEvent, useState } from "react";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const res = await signIn("credentials", {
      redirect: true,
      username,
      password,
      callbackUrl: "/",
    });
    if (res?.error) setError("Invalid credentials");
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white p-4">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-sm bg-gray-900 p-6 rounded-xl border border-gray-800 space-y-4"
      >
        <h1 className="text-2xl font-bold text-center">Team Portal Login</h1>
        <div className="space-y-2">
          <label className="text-sm">Username</label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-3 py-2 rounded bg-gray-800 border border-gray-700 focus:outline-none"
            required
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 rounded bg-gray-800 border border-gray-700 focus:outline-none"
            required
          />
        </div>
        {error && <p className="text-red-400 text-sm">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 py-2 rounded font-semibold"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
        <p className="text-xs text-center text-gray-400">No signups allowed.</p>
      </form>
    </div>
  );
}
