import { AppSidebar } from '@/components/app-sidebar'
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Users, BookMarked, TrendingUp } from "lucide-react"
import Link from "next/link"
import { getDashboardData } from '@/lib/dashboard-data'

export default async function DashboardPage() {
  const data = await getDashboardData()

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        {/* Encabezado */}
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbPage>Dashboard</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>

        {/* Contenido */}
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          {/* Cards principales */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <DashboardLinkCard
              href="/libros"
              title="Total Libros"
              value={data.totalLibros}
              icon={<BookOpen className="h-4 w-4 text-muted-foreground" />}
              change="+12% desde el mes pasado"
            />
            <DashboardLinkCard
              href="/clientes"
              title="Clientes Activos"
              value={data.totalClientes}
              icon={<Users className="h-4 w-4 text-muted-foreground" />}
              change="+8% desde el mes pasado"
            />
            <DashboardLinkCard
              href="/prestamos"
              title="Préstamos Activos"
              value={data.prestamosActivos}
              icon={<BookMarked className="h-4 w-4 text-muted-foreground" />}
              change="+23% desde el mes pasado"
            />
            <DashboardLinkCard
              href="/devoluciones"
              title="Tasa de Devolución"
              value={`${data.tasaDevolucion}%`}
              icon={<TrendingUp className="h-4 w-4 text-muted-foreground" />}
              change="+2.1% desde el mes pasado"
            />
          </div>

          {/* Actividad reciente + libros populares */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            {/* Actividad reciente */}
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Actividad Reciente</CardTitle>
                <CardDescription>Últimos préstamos y devoluciones</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {data.actividadReciente.map((item) => (
                    <div key={item.id} className="flex items-center gap-4">
                      <div className="bg-muted flex h-9 w-9 items-center justify-center rounded-full">
                        <BookOpen className="h-4 w-4" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium leading-none">
                          Préstamo #{item.id}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {item.libro} — Cliente: {item.cliente}
                        </p>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {new Date(item.fecha).toLocaleDateString("es-AR")}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Libros populares */}
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Libros Populares</CardTitle>
                <CardDescription>Los más prestados este mes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {data.librosPopulares.map((libro, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="bg-primary/10 text-primary flex h-8 w-8 items-center justify-center rounded text-sm font-medium">
                        {i + 1}
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium leading-none">{libro.titulo}</p>
                        <p className="text-xs text-muted-foreground">{libro.prestamos} préstamos</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

// 🔹 Componente de Card interactiva
function DashboardLinkCard({
  href,
  title,
  value,
  icon,
  change,
}: {
  href: string
  title: string
  value: number | string
  icon: React.ReactNode
  change?: string
}) {
  return (
    <Link href={href} className="transition-transform hover:scale-105">
      <Card className="h-full cursor-pointer hover:shadow-lg transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
          {icon}
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{value}</div>
          {change && <p className="text-xs text-muted-foreground">{change}</p>}
        </CardContent>
      </Card>
    </Link>
  )
}
