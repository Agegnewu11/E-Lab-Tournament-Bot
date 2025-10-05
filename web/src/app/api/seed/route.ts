import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";

export async function POST() {
  const adminEmail = process.env.ADMIN_EMAIL || "admin@example.com";
  const adminPassword = process.env.ADMIN_PASSWORD || "admin123!";
  const userEmail = process.env.USER_EMAIL || "user@example.com";
  const userPassword = process.env.USER_PASSWORD || "user123!";

  const [adminHash, userHash] = await Promise.all([
    bcrypt.hash(adminPassword, 10),
    bcrypt.hash(userPassword, 10),
  ]);

  const admin = await prisma.user.upsert({
    where: { username: "admin" },
    update: { hashedPassword: adminHash, role: "ADMIN" },
    create: {
      username: "admin",
      email: adminEmail,
      hashedPassword: adminHash,
      role: "ADMIN",
      name: "Administrator",
    },
  });

  const user = await prisma.user.upsert({
    where: { username: "member" },
    update: { hashedPassword: userHash, role: "USER" },
    create: {
      username: "member",
      email: userEmail,
      hashedPassword: userHash,
      role: "USER",
      name: "Team Member",
    },
  });

  return NextResponse.json({ admin, user });
}
