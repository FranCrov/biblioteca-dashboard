'use client'

import { useState, useEffect } from "react"
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
import { Plus, Search } from "lucide-react"
import { LibrosTable } from "@/components/libros-table"

export default function LibrosPage() {
  const [libros, setLibros] = useState([])
  const [search, setSearch] = useState("")
  const [filtered, setFiltered] = useState([])

  // 🔹 Cargar los libros desde la API al montar el componente
  useEffect(() => {
    const fetchLibros = async () => {
      const res = await fetch("/api/libros")
      const data = await res.json()
      setLibros(data)
      setFiltered(data)
    }
    fetchLibros()
  }, [])

  // 🔹 Filtrar libros en tiempo real
  useEffect(() => {
    const results = libros.filter((libro: any) =>
      libro.titulo.toLowerCase().includes(search.toLowerCase()) ||
      libro.autor.nombre.toLowerCase().includes(search.toLowerCase()) ||
      libro.categoria.nombre.toLowerCase().includes(search.toLowerCase())
    )
    setFiltered(results)
  }, [search, libros])

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
                  <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Libros</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Gestión de Libros</h1>
              <p className="text-muted-foreground">Administra el catálogo de la biblioteca</p>
            </div>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Agregar Libro
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar libros..."
                className="pl-8"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Catálogo de Libros</CardTitle>
              <CardDescription>Lista completa de libros disponibles</CardDescription>
            </CardHeader>
            <CardContent>
              <LibrosTable libros={filtered} />
            </CardContent>
          </Card>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
