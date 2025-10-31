import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const empleados = await prisma.empleado.findMany({
      orderBy: { id: "asc" },
    });
    return NextResponse.json(empleados);
  } catch (error) {
    console.error("Error al obtener empleados:", error);
    return NextResponse.json({ error: "Error al obtener empleados" }, { status: 500 });
  }
}
