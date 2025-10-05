"use client";
import { useSession } from "next-auth/react";

export default function ProfilePage() {
  const { data: session } = useSession();
  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-4">My Profile</h1>
      <pre className="bg-gray-900 p-4 rounded border border-gray-800 text-sm overflow-x-auto">
        {JSON.stringify(session, null, 2)}
      </pre>
    </div>
  );
}
