"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function Home() {
  const { data: session } = useSession();

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <header className="flex items-center justify-between p-4 border-b border-gray-800">
        <div className="font-bold">Team Portal</div>
        {session && (
          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="px-3 py-1 rounded bg-red-600 hover:bg-red-500"
          >
            Logout
          </button>
        )}
      </header>
      <main className="p-6 max-w-2xl mx-auto">
        {!session ? (
          <div className="text-center space-y-4">
            <p className="text-gray-400">You must be logged in</p>
            <Link href="/login" className="inline-block bg-indigo-600 px-6 py-3 rounded">Go to Login</Link>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link href="/songs" className="block text-center text-xl font-bold bg-blue-600 hover:bg-blue-500 p-8 rounded-lg">Songs</Link>
              <Link href="/groups" className="block text-center text-xl font-bold bg-green-600 hover:bg-green-500 p-8 rounded-lg">Group</Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <Link href="/profile" className="block text-center bg-gray-800 hover:bg-gray-700 p-4 rounded">My Profile</Link>
              {(session as any).role === "ADMIN" && (
                <Link href="/admin" className="block text-center bg-yellow-600 hover:bg-yellow-500 p-4 rounded">Admin Panel</Link>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
