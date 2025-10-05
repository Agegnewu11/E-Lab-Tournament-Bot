"use client";
import useSWR, { mutate } from "swr";
import { useState } from "react";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function AdminGroupsPage() {
  const { data } = useSWR("/api/groups", fetcher);
  const [name, setName] = useState("");

  async function createGroup() {
    await fetch("/api/groups", { method: "POST", body: JSON.stringify({ name }) });
    setName("");
    mutate("/api/groups");
  }

  return (
    <div className="p-6 text-white space-y-4">
      <h1 className="text-2xl font-bold">Admin Groups</h1>
      <div className="bg-gray-900 p-4 rounded border border-gray-800 space-y-2">
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" className="px-3 py-2 rounded bg-gray-800 border border-gray-700 w-full" />
        <button onClick={createGroup} className="px-3 py-2 bg-green-600 rounded">Add Group</button>
      </div>
      <ul className="space-y-2">
        {data?.map((g: any) => (
          <li key={g.id} className="p-3 bg-gray-900 rounded border border-gray-800">{g.name}</li>
        ))}
      </ul>
    </div>
  );
}