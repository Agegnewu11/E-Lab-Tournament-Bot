"use client";
import useSWR, { mutate } from "swr";
import { useState } from "react";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function AdminSongsPage() {
  const { data } = useSWR("/api/songs", fetcher);
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");

  async function createSong() {
    await fetch("/api/songs", { method: "POST", body: JSON.stringify({ title, artist }) });
    setTitle("");
    setArtist("");
    mutate("/api/songs");
  }

  return (
    <div className="p-6 text-white space-y-4">
      <h1 className="text-2xl font-bold">Admin Songs</h1>
      <div className="bg-gray-900 p-4 rounded border border-gray-800 space-y-2">
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" className="px-3 py-2 rounded bg-gray-800 border border-gray-700 w-full" />
        <input value={artist} onChange={(e) => setArtist(e.target.value)} placeholder="Artist" className="px-3 py-2 rounded bg-gray-800 border border-gray-700 w-full" />
        <button onClick={createSong} className="px-3 py-2 bg-blue-600 rounded">Add Song</button>
      </div>
      <ul className="space-y-2">
        {data?.map((s: any) => (
          <li key={s.id} className="p-3 bg-gray-900 rounded border border-gray-800">{s.title}</li>
        ))}
      </ul>
    </div>
  );
}