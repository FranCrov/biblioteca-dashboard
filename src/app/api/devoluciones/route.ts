import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    const devoluciones = await prisma.devolucion.findMany({
      include: {
        prestamo: {
          include: {
            cliente: true,
            libro: true,
          },
        },
      },
      orderBy: { fecha: "desc" },
    });

    return NextResponse.json(devoluciones);
  } catch (error) {
    console.error("Error al obtener devoluciones:", error);
    return NextResponse.json({ error: "Error al obtener devoluciones" }, { status: 500 });
  }
}
