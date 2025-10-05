"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function AdminPage() {
  const { data: session } = useSession();
  const isAdmin = (session as any)?.role === "ADMIN";

  if (!isAdmin) {
    return (
      <div className="p-6 text-white">
        <p>Access denied.</p>
        <Link href="/" className="underline">Go back</Link>
      </div>
    );
  }

  return (
    <div className="p-6 text-white space-y-4">
      <h1 className="text-2xl font-bold">Admin Panel</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        <Link href="/admin/songs" className="text-center bg-blue-700 hover:bg-blue-600 p-4 rounded">Songs</Link>
        <Link href="/admin/groups" className="text-center bg-green-700 hover:bg-green-600 p-4 rounded">Groups</Link>
        <Link href="/admin/users" className="text-center bg-purple-700 hover:bg-purple-600 p-4 rounded">Users</Link>
      </div>
    </div>
  );
}
