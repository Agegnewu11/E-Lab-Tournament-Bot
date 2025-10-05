import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import bcrypt from "bcryptjs";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session || (session as any).role !== "ADMIN") return new NextResponse("Forbidden", { status: 403 });
  const users = await prisma.user.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(users);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session || (session as any).role !== "ADMIN") return new NextResponse("Forbidden", { status: 403 });
  const body = await req.json();
  const hashedPassword = await bcrypt.hash(body.password, 10);
  const user = await prisma.user.create({ data: { username: body.username, email: body.email, hashedPassword, role: body.role === "ADMIN" ? "ADMIN" : "USER" } });
  return NextResponse.json(user, { status: 201 });
}
