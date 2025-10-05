import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET() {
  const groups = await prisma.group.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(groups);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session || (session as any).role !== "ADMIN") {
    return new NextResponse("Forbidden", { status: 403 });
  }
  const body = await req.json();
  const group = await prisma.group.create({ data: { name: body.name } });
  return NextResponse.json(group, { status: 201 });
}
