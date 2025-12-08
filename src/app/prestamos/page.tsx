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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
  {/* Card 1: Total de Préstamos */}
  <Card className="flex-1">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">Total de Préstamos</CardTitle>
      <BookMarked className="h-4 w-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <div className="text-3xl font-bold">{totalPrestamos}</div>
      <p className="text-xs text-muted-foreground">
        Préstamos registrados en el sistema
      </p>
    </CardContent>
  </Card>

  {/* Card 2: Categorías Disponibles */}
  <Card className="flex-1">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">Categorías Disponibles</CardTitle>
      <BookMarked className="h-4 w-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <div className="text-3xl font-bold">{categorias.length}</div>
      <p className="text-xs text-muted-foreground">
        Categorías de libros en la biblioteca
      </p>
    </CardContent>
  </Card>

  {/* Card 3: Explicación del Drill Down */}
  <Card className="flex-1">
    <CardHeader className="pb-2">
      <CardTitle className="text-sm font-medium">Indicadores de Préstamos</CardTitle>
    </CardHeader>
    <CardContent className="space-y-2">
      <div className="flex items-center gap-2">
        <span className="w-3 h-3 rounded-full bg-green-600"></span>
        <p className="text-sm">Más de 10 préstamos — <strong>Alto</strong></p>
      </div>
      <div className="flex items-center gap-2">
        <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
        <p className="text-sm">Entre 5 y 10 préstamos — <strong>Medio</strong></p>
      </div>
      <div className="flex items-center gap-2">
        <span className="w-3 h-3 rounded-full bg-red-600"></span>
        <p className="text-sm">Menos de 5 préstamos — <strong>Bajo</strong></p>
      </div>
    </CardContent>
  </Card>
</div>

          
          <PrestamosDrillDown categoriasData={categoriasData} />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
