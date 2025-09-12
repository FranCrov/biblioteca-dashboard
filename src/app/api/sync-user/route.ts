import { prisma } from "@/src/libs/db";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST() {
  const user = await currentUser();

  if (!user) {
    return NextResponse.json({ error: "No authenticated user" }, { status: 401 });
  }

  // Ver si ya existe en tu BD
  const existingUser = await prisma.usuario.findUnique({
    where: { clerkId: user.id },
  });

  if (!existingUser) {
    await prisma.usuario.create({
      data: {
        clerkId: user.id,
        nombre: user.firstName || "Sin nombre",
        email: user.emailAddresses[0].emailAddress,
      },
    });
  }

  return NextResponse.json({ success: true });
}