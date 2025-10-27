import { NextResponse } from "next/server"
import {prisma} from "@/lib/db"

export async function GET() {
  try {
    const libros = await prisma.libro.findMany({
      include: {
        autor: true,
        categoria: true,
      },
    })
    return NextResponse.json(libros)
  } catch (error) {
    console.error("Error al obtener libros:", error)
    return NextResponse.json({ error: "Error al obtener libros" }, { status: 500 })
  }
}
