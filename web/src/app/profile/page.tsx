"use client";
import { useSession } from "next-auth/react";
import { useState } from "react";

export default function ProfilePage() {
  const { data: session } = useSession();
  const [image, setImage] = useState<string | null>(null);

  async function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const form = new FormData();
    form.set("file", file);
    const res = await fetch("/api/profile/avatar", { method: "POST", body: form });
    const data = await res.json();
    setImage(data.image);
  }
  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-4">My Profile</h1>
      <div className="mb-4 flex items-center gap-4">
        <img src={(image ?? (session as any)?.user?.image) || "https://placehold.co/64x64"} alt="avatar" className="w-16 h-16 rounded-full border border-gray-700" />
        <label className="bg-gray-800 hover:bg-gray-700 px-3 py-2 rounded cursor-pointer">
          <input type="file" accept="image/*" className="hidden" onChange={onFile} />
          Change avatar
        </label>
      </div>
      <pre className="bg-gray-900 p-4 rounded border border-gray-800 text-sm overflow-x-auto">
        {JSON.stringify(session, null, 2)}
      </pre>
    </div>
  );
}
