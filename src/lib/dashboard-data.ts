import {prisma} from "@/lib/db"

export async function getDashboardData() {
  const totalLibros = await prisma.libro.count()
  const totalClientes = await prisma.cliente.count()
  const prestamosActivos = await prisma.prestamo.count({ where: { devuelto: false } })
  const totalDevoluciones = await prisma.devolucion.count()
  const totalPrestamos = await prisma.prestamo.count()

  const tasaDevolucion =
    totalPrestamos > 0 ? ((totalDevoluciones / totalPrestamos) * 100).toFixed(1) : "0"

  const librosPopulares = await prisma.libro.findMany({
    take: 5,
    include: { prestamos: true },
  })

  const actividadReciente = await prisma.prestamo.findMany({
    orderBy: { fecha: "desc" },
    take: 5,
    include: { cliente: true, libro: true },
  })

  return {
    totalLibros,
    totalClientes,
    prestamosActivos,
    tasaDevolucion,
    librosPopulares: librosPopulares.map(l => ({
      titulo: l.titulo,
      prestamos: l.prestamos.length,
    })),
    actividadReciente: actividadReciente.map(p => ({
      id: p.id,
      cliente: p.cliente.nombre,
      libro: p.libro.titulo,
      fecha: p.fecha,
    })),
  }
}
