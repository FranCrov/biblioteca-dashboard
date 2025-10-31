"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

export function EmpleadosTable({ empleados }: { empleados: any[] }) {
  const [search, setSearch] = useState("")

  const filtered = empleados.filter((e) =>
    `${e.nombre} ${e.apellido} ${e.email}`.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <>
      {/* Buscador */}
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar empleados..."
            className="pl-8"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Tabla */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Empleados</CardTitle>
          <CardDescription>Todos los empleados registrados en la biblioteca</CardDescription>
        </CardHeader>
        <CardContent>
          {filtered.length === 0 ? (
            <div className="text-muted-foreground text-center py-8">
              No se encontraron empleados
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Apellido</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Teléfono</TableHead>
                  <TableHead>Puesto</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((e) => (
                  <TableRow key={e.id}>
                    <TableCell className="font-medium">{e.id}</TableCell>
                    <TableCell>{e.nombre}</TableCell>
                    <TableCell>{e.apellido}</TableCell>
                    <TableCell>{e.email}</TableCell>
                    <TableCell>{e.telefono || "—"}</TableCell>
                    <TableCell>
                      <Badge className="bg-orange-500/90 text-white hover:bg-orange-600">
                        {e.puesto || "Sin asignar"}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </>
  )
}
