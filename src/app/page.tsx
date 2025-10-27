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
      <AppSidebar>
        <SidebarInset>
          <SidebarTrigger />
          <div className="p-6 space-y-6">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <Link href="/">Home</Link>
                </BreadcrumbItem>
                <BreadcrumbItem>
                  <BreadcrumbPage>Dashboard</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <Separator />
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen size={20} />
                    Libros
                  </CardTitle>
                  <CardDescription>Total de libros registrados</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">1,234</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users size={20} />
                    Clientes
                  </CardTitle>
                  <CardDescription>Total de clientes registrados</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">567</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookMarked size={20} />
                    Préstamos
                  </CardTitle>
                  <CardDescription>Total de préstamos activos</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">89</p>
                </CardContent>      
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp size={20} />
                    Devoluciones
                  </CardTitle>
                  <CardDescription>Total de devoluciones este mes</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">45</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </SidebarInset>
      </AppSidebar>
    </SidebarProvider>
  )
}
