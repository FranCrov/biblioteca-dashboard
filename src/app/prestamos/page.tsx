import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { PrestamosDrillDown } from "@/components/prestamos-drill-down"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BookMarked } from "lucide-react"
import {prisma} from "@/lib/db"

export default async function PrestamosPage() {
  const totalPrestamos = await prisma.prestamo.count()

  const categorias = await prisma.categoria.findMany({
    include: {
      libros: {
        include: { prestamos: true, autor: true },
      },
    },
  })

  // Transformar los datos para el drill-down
  const categoriasData = categorias.map((c) => ({
    id: c.id,
    name: c.nombre,
    totalLoans: c.libros.reduce((acc, l) => acc + l.prestamos.length, 0),
    libros: c.libros.map((l) => ({
      id: l.id,
      title: l.titulo,
      author: l.autor ? l.autor.nombre : "—",  
      loans: l.prestamos.length,
    })),
  }))

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Préstamos</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div>
            <h1 className="text-3xl font-bold">Gestión de Préstamos</h1>
            <p className="text-muted-foreground">
              Explora los préstamos por categoría, libro y cliente
            </p>
          </div>

          <Card className="w-full md:w-fit">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Préstamos</CardTitle>
              <BookMarked className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{totalPrestamos}</div>
              <p className="text-xs text-muted-foreground">Préstamos registrados en el sistema</p>
            </CardContent>
          </Card>

          <PrestamosDrillDown categoriasData={categoriasData} />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
