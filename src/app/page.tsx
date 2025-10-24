import { AppSidebar } from "@/components/app-sidebar"
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Users, BookMarked, TrendingUp } from "lucide-react"
import Link from "next/link"

export default function Page() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
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
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Link href="/libros" className="transition-transform hover:scale-105">
              <Card className="h-full cursor-pointer hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Libros</CardTitle>
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">2,543</div>
                  <p className="text-xs text-muted-foreground">+12% desde el mes pasado</p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/clientes" className="transition-transform hover:scale-105">
              <Card className="h-full cursor-pointer hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Clientes Activos</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1,234</div>
                  <p className="text-xs text-muted-foreground">+8% desde el mes pasado</p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/prestamos" className="transition-transform hover:scale-105">
              <Card className="h-full cursor-pointer hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Préstamos Activos</CardTitle>
                  <BookMarked className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">456</div>
                  <p className="text-xs text-muted-foreground">+23% desde el mes pasado</p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/devoluciones" className="transition-transform hover:scale-105">
              <Card className="h-full cursor-pointer hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Tasa de Devolución</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">94.5%</div>
                  <p className="text-xs text-muted-foreground">+2.1% desde el mes pasado</p>
                </CardContent>
              </Card>
            </Link>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Actividad Reciente</CardTitle>
                <CardDescription>Últimos préstamos y devoluciones</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="bg-muted flex h-9 w-9 items-center justify-center rounded-full">
                        <BookOpen className="h-4 w-4" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium leading-none">Préstamo #{1000 + i}</p>
                        <p className="text-sm text-muted-foreground">Cliente: Usuario {i}</p>
                      </div>
                      <div className="text-sm text-muted-foreground">Hace {i}h</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Libros Populares</CardTitle>
                <CardDescription>Los más prestados este mes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {["Cien años de soledad", "Don Quijote", "El Principito", "La Odisea"].map((book, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="bg-primary/10 text-primary flex h-8 w-8 items-center justify-center rounded text-sm font-medium">
                        {i + 1}
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium leading-none">{book}</p>
                        <p className="text-xs text-muted-foreground">{45 - i * 5} préstamos</p>
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
