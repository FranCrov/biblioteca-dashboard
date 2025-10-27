"use client"

import { useState } from "react"
import { ChevronRight, ChevronLeft, Circle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

type Categoria = {
  id: number
  name: string
  totalLoans: number
  libros: {
    id: number
    title: string
    author: string
    loans: number
  }[]
}

type Cliente = {
  id: number
  nombre: string
  email: string
  fecha: string
  devuelto: boolean
}

export function PrestamosDrillDown({ categoriasData }: { categoriasData: Categoria[] }) {
  const [viewLevel, setViewLevel] = useState<"categories" | "books" | "clients">("categories")
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null)
  const [selectedBook, setSelectedBook] = useState<number | null>(null)
  const [clientes, setClientes] = useState<Cliente[]>([])

  const handleCategoryClick = (categoryId: number) => {
    setSelectedCategory(categoryId)
    setViewLevel("books")
  }

  const handleBookClick = async (bookId: number) => {
    setSelectedBook(bookId)
    setViewLevel("clients")

    // Traer clientes del backend para este libro
    const res = await fetch(`/api/clientes-por-libro?libroId=${bookId}`)
    const data = await res.json()
    setClientes(data)
  }

  const handleBack = () => {
    if (viewLevel === "clients") {
      setViewLevel("books")
      setSelectedBook(null)
    } else if (viewLevel === "books") {
      setViewLevel("categories")
      setSelectedCategory(null)
    }
  }

  const getStatusColor = (loans: number) => {
    if (loans > 10) return "text-green-600"
    if (loans >= 5) return "text-yellow-600"
    return "text-red-600"
  }

  const getStatusBadge = (loans: number) => {
    if (loans > 10) return <Badge className="bg-green-600">Alto</Badge>
    if (loans >= 5) return <Badge className="bg-yellow-600">Medio</Badge>
    return <Badge className="bg-red-600">Bajo</Badge>
  }

  const categoriaSeleccionada = categoriasData.find((c) => c.id === selectedCategory)
  const libroSeleccionado = categoriaSeleccionada?.libros.find((l) => l.id === selectedBook)

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>
              {viewLevel === "categories" && "Categorías de Libros"}
              {viewLevel === "books" && `Libros - ${categoriaSeleccionada?.name}`}
              {viewLevel === "clients" && `Clientes - ${libroSeleccionado?.title}`}
            </CardTitle>
            <CardDescription>
              {viewLevel === "categories" && "Haz clic en una categoría para ver los libros"}
              {viewLevel === "books" && "Haz clic en un libro para ver los clientes que lo pidieron prestado"}
              {viewLevel === "clients" && "Lista de clientes que pidieron prestado este libro"}
            </CardDescription>
          </div>
          {viewLevel !== "categories" && (
            <Button variant="outline" onClick={handleBack}>
              <ChevronLeft className="mr-2 h-4 w-4" />
              Volver
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {viewLevel === "categories" && (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Categoría</TableHead>
                <TableHead className="text-right">Total de Préstamos</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categoriasData.map((c) => (
                <TableRow
                  key={c.id}
                  className="cursor-pointer hover:bg-muted/50 transition-all"
                  onClick={() => handleCategoryClick(c.id)}
                >
                  <TableCell className="font-medium">{c.name}</TableCell>
                  <TableCell className="text-right">{c.totalLoans}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}

        {viewLevel === "books" && categoriaSeleccionada && (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Título</TableHead>
                <TableHead>Autor</TableHead>
                <TableHead className="text-right">Préstamos</TableHead>
                <TableHead className="text-center">Estado</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categoriaSeleccionada.libros.map((l) => (
                <TableRow
                  key={l.id}
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => handleBookClick(l.id)}
                >
                  <TableCell className="font-medium">{l.title}</TableCell>
                  <TableCell>{l.author || "—"}</TableCell>
                  <TableCell className={`text-right ${getStatusColor(l.loans)}`}>{l.loans}</TableCell>
                  <TableCell className="text-center">{getStatusBadge(l.loans)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}

        {viewLevel === "clients" && (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Cliente</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Fecha de Préstamo</TableHead>
                <TableHead>Estado</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {clientes.map((c) => (
                <TableRow key={c.id}>
                  <TableCell className="font-medium">{c.nombre}</TableCell>
                  <TableCell>{c.email}</TableCell>
                  <TableCell>{new Date(c.fecha).toLocaleDateString("es-AR")}</TableCell>
                  <TableCell>
                    {c.devuelto ? <Badge variant="outline">Devuelto</Badge> : <Badge>Activo</Badge>}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  )
}
