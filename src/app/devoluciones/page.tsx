"use client";

import { useEffect, useState } from "react";
import { AppSidebar } from "@/components/app-sidebar";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";

interface Devolucion {
  id: number;
  fecha: string;
  observacion?: string;
  prestamo?: {
    cliente?: {
      nombre?: string;
    };
    libro?: {
      titulo?: string;
    };
  };
}

export default function DevolucionesPage() {
  const [devoluciones, setDevoluciones] = useState<Devolucion[]>([]);
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    const fetchDevoluciones = async () => {
      const res = await fetch("/api/devoluciones");
      const data = await res.json();
      setDevoluciones(data);
    };
    fetchDevoluciones();
  }, []);

  const filtradas = devoluciones.filter((d) =>
    d.prestamo?.cliente?.nombre?.toLowerCase().includes(busqueda.toLowerCase()) ||
    d.prestamo?.libro?.titulo?.toLowerCase().includes(busqueda.toLowerCase()) ||
    d.observacion?.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Devoluciones</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Gestión de Devoluciones</h1>
              <p className="text-muted-foreground">Procesa las devoluciones de libros</p>
            </div>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Registrar Devolución
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por cliente, libro u observación..."
                className="pl-8"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Historial de Devoluciones</CardTitle>
              <CardDescription>Registro de libros devueltos</CardDescription>
            </CardHeader>
            <CardContent>
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">Cliente</th>
                    <th className="text-left p-2">Libro</th>
                    <th className="text-left p-2">Fecha</th>
                    <th className="text-left p-2">Observación</th>
                  </tr>
                </thead>
                <tbody>
                  {filtradas.length > 0 ? (
                    filtradas.map((d) => (
                      <tr key={d.id} className="border-b hover:bg-muted/40">
                        <td className="p-2">{d.prestamo?.cliente?.nombre}</td>
                        <td className="p-2">{d.prestamo?.libro?.titulo}</td>
                        <td className="p-2">{new Date(d.fecha).toLocaleDateString()}</td>
                        <td className="p-2">{d.observacion || "—"}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="text-center p-4 text-muted-foreground">
                        No se encontraron devoluciones
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
