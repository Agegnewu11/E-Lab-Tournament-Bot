import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { prisma } from "@/lib/db";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return new NextResponse("Unauthorized", { status: 401 });
  const form = await req.formData();
  const file = form.get("file") as File | null;
  if (!file) return new NextResponse("Bad request", { status: 400 });
  // For demo: store as base64 data URL (not for production)
  const array = await file.arrayBuffer();
  const base64 = Buffer.from(array).toString("base64");
  const dataUrl = `data:${file.type};base64,${base64}`;
  const user = await prisma.user.update({ where: { email: session.user?.email || "" }, data: { image: dataUrl } });
  return NextResponse.json({ image: user.image });
}
