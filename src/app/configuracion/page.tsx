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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function ConfiguracionPage() {
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
                  <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Configuración</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div>
            <h1 className="text-3xl font-bold">Configuración</h1>
            <p className="text-muted-foreground">Ajusta las preferencias del sistema</p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Información General</CardTitle>
                <CardDescription>Datos básicos de la biblioteca</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nombre de la Biblioteca</Label>
                  <Input id="name" placeholder="BiblioTech" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email de Contacto</Label>
                  <Input id="email" type="email" placeholder="contacto@bibliotech.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Teléfono</Label>
                  <Input id="phone" placeholder="+34 123 456 789" />
                </div>
                <Button>Guardar Cambios</Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Configuración de Préstamos</CardTitle>
                <CardDescription>Parámetros del sistema de préstamos</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="loan-days">Días de Préstamo</Label>
                  <Input id="loan-days" type="number" placeholder="14" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="max-books">Máximo de Libros por Cliente</Label>
                  <Input id="max-books" type="number" placeholder="3" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fine">Multa por Día de Retraso (€)</Label>
                  <Input id="fine" type="number" step="0.01" placeholder="0.50" />
                </div>
                <Button>Guardar Cambios</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
