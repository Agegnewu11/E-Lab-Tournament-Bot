"use client";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function SongsPage() {
  const { data, isLoading } = useSWR("/api/songs", fetcher);
  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-4">Songs</h1>
      {isLoading ? (
        <p className="text-gray-400">Loading...</p>
      ) : (
        <ul className="space-y-2">
          {data?.map((s: any) => (
            <li key={s.id} className="p-3 bg-gray-900 rounded border border-gray-800">
              <div className="font-semibold">{s.title}</div>
              <div className="text-sm text-gray-400">{s.artist ?? "Unknown"}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
