import { prisma } from "@/lib/db";
import Link from "next/link";

export default async function SongDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const song = await prisma.song.findUnique({ where: { id } });
  if (!song) return <div className="p-6 text-white">Not found</div>;
  return (
    <div className="p-6 text-white space-y-4 max-w-3xl mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">{song.title}</h1>
        <div className="space-x-2">
          {song.lyrics && (
            <a
              href={`data:text/plain;charset=utf-8,${encodeURIComponent(song.lyrics)}`}
              download={`${song.title}.txt`}
              className="px-3 py-2 bg-gray-800 rounded border border-gray-700"
            >
              Download lyrics (TXT)
            </a>
          )}
          {song.audioUrl && (
            <a href={song.audioUrl} download className="px-3 py-2 bg-gray-800 rounded border border-gray-700">
              Download audio (MP3)
            </a>
          )}
        </div>
      </div>
      {song.artist && <p className="text-gray-400">by {song.artist}</p>}
      {song.lyrics && (
        <pre className="bg-gray-900 p-4 rounded border border-gray-800 whitespace-pre-wrap">{song.lyrics}</pre>
      )}
      {song.audioUrl && (
        <audio controls className="w-full">
          <source src={song.audioUrl} type="audio/mpeg" />
        </audio>
      )}
      <Link href="/songs" className="underline">Back to Songs</Link>
    </div>
  );
}
