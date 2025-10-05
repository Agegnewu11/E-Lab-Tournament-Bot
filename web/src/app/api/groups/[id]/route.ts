import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session || (session as any).role !== "ADMIN") {
    return new NextResponse("Forbidden", { status: 403 });
  }
  const body = await req.json();
  const group = await prisma.group.update({ where: { id: params.id }, data: { name: body.name } });
  return NextResponse.json(group);
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session || (session as any).role !== "ADMIN") {
    return new NextResponse("Forbidden", { status: 403 });
  }
  await prisma.group.delete({ where: { id: params.id } });
  return new NextResponse(null, { status: 204 });
}
