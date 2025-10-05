"use client";
import useSWR, { mutate } from "swr";
import { useState } from "react";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function AdminUsersPage() {
  const { data } = useSWR("/api/admin/users", fetcher);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("USER");

  async function createUser() {
    await fetch("/api/admin/users", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ username, email, password, role }) });
    setUsername(""); setEmail(""); setPassword(""); setRole("USER");
    mutate("/api/admin/users");
  }

  return (
    <div className="p-6 text-white space-y-4">
      <h1 className="text-2xl font-bold">Manage Users</h1>
      <div className="bg-gray-900 p-4 rounded border border-gray-800 grid grid-cols-1 sm:grid-cols-4 gap-2">
        <input value={username} onChange={e=>setUsername(e.target.value)} placeholder="Username" className="px-3 py-2 rounded bg-gray-800 border border-gray-700 w-full" />
        <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" className="px-3 py-2 rounded bg-gray-800 border border-gray-700 w-full" />
        <input value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" type="password" className="px-3 py-2 rounded bg-gray-800 border border-gray-700 w-full" />
        <select value={role} onChange={e=>setRole(e.target.value)} className="px-3 py-2 rounded bg-gray-800 border border-gray-700 w-full">
          <option>USER</option>
          <option>ADMIN</option>
        </select>
        <button onClick={createUser} className="px-3 py-2 bg-purple-600 rounded col-span-1 sm:col-span-4">Create</button>
      </div>
      <ul className="space-y-2">
        {data?.map((u: any) => (
          <li key={u.id} className="p-3 bg-gray-900 rounded border border-gray-800 flex items-center justify-between">
            <span>{u.username} — {u.role}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}