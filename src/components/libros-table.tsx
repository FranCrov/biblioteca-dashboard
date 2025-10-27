"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface Libro {
  id: number
  titulo: string
  stock: number
  autor: {
    nombre: string
  }
  categoria: {
    nombre: string
  }
}

export function LibrosTable({ libros }: { libros: Libro[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Título</TableHead>
          <TableHead>Autor</TableHead>
          <TableHead>Categoría</TableHead>
          <TableHead className="text-right">Stock</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {libros.length === 0 ? (
          <TableRow>
            <TableCell colSpan={5} className="text-center text-muted-foreground py-4">
              No hay libros registrados
            </TableCell>
          </TableRow>
        ) : (
          libros.map((libro) => (
            <TableRow key={libro.id}>
              <TableCell className="font-medium">{libro.titulo}</TableCell>
              <TableCell>{libro.autor?.nombre || "Sin autor"}</TableCell>
              <TableCell>{libro.categoria?.nombre || "Sin categoría"}</TableCell>
              <TableCell className="text-right">{libro.stock}</TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  )
}
