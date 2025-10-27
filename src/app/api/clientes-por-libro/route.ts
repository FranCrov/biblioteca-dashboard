import {prisma} from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const libroId = parseInt(searchParams.get("libroId") || "0")

  if (!libroId) {
    return NextResponse.json({ error: "ID inválido" }, { status: 400 })
  }

  const prestamos = await prisma.prestamo.findMany({
    where: { libroId },
    include: { cliente: true },
  })

  const data = prestamos.map((p) => ({
    id: p.id,
    nombre: p.cliente.nombre,
    email: p.cliente.email,
    fecha: p.fecha,
    devuelto: p.devuelto,
  }))

  return NextResponse.json(data)
}
