import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function PATCH(_req: Request, context: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session || (session as any).role !== "ADMIN") {
    return new NextResponse("Forbidden", { status: 403 });
  }
  const { id } = await context.params;
  const body = await _req.json();
  const song = await prisma.song.update({ where: { id }, data: { title: body.title, artist: body.artist } });
  return NextResponse.json(song);
}

export async function DELETE(_req: Request, context: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session || (session as any).role !== "ADMIN") {
    return new NextResponse("Forbidden", { status: 403 });
  }
  const { id } = await context.params;
  await prisma.song.delete({ where: { id } });
  return new NextResponse(null, { status: 204 });
}
