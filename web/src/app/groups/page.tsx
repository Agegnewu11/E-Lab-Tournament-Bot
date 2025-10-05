"use client";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function GroupsPage() {
  const { data, isLoading } = useSWR("/api/groups", fetcher);
  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-4">Groups</h1>
      {isLoading ? (
        <p className="text-gray-400">Loading...</p>
      ) : (
        <ul className="space-y-2">
          {data?.map((g: any) => (
            <li key={g.id} className="p-3 bg-gray-900 rounded border border-gray-800">
              <div className="font-semibold">{g.name}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
