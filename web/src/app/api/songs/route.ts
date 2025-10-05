import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET() {
  const songs = await prisma.song.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(songs);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session || (session as any).role !== "ADMIN") {
    return new NextResponse("Forbidden", { status: 403 });
  }
  const body = await req.json();
  const song = await prisma.song.create({ data: { title: body.title, artist: body.artist } });
  return NextResponse.json(song, { status: 201 });
}
