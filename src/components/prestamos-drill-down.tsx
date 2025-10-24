"use client"

import { useState } from "react"
import { ChevronRight, ChevronLeft, Circle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

// Sample data
const categoriesData = [
  { id: 1, name: "Ficción", totalLoans: 245 },
  { id: 2, name: "No Ficción", totalLoans: 189 },
  { id: 3, name: "Ciencia", totalLoans: 156 },
  { id: 4, name: "Historia", totalLoans: 134 },
  { id: 5, name: "Tecnología", totalLoans: 98 },
]

const booksData: Record<number, Array<{ id: number; title: string; author: string; loans: number }>> = {
  1: [
    { id: 101, title: "Cien años de soledad", author: "Gabriel García Márquez", loans: 45 },
    { id: 102, title: "Don Quijote de la Mancha", author: "Miguel de Cervantes", loans: 38 },
    { id: 103, title: "El Principito", author: "Antoine de Saint-Exupéry", loans: 32 },
    { id: 104, title: "1984", author: "George Orwell", loans: 28 },
    { id: 105, title: "Rayuela", author: "Julio Cortázar", loans: 15 },
    { id: 106, title: "La sombra del viento", author: "Carlos Ruiz Zafón", loans: 8 },
  ],
  2: [
    { id: 201, title: "Sapiens", author: "Yuval Noah Harari", loans: 42 },
    { id: 202, title: "Educated", author: "Tara Westover", loans: 25 },
    { id: 203, title: "Thinking, Fast and Slow", author: "Daniel Kahneman", loans: 18 },
    { id: 204, title: "The Immortal Life of Henrietta Lacks", author: "Rebecca Skloot", loans: 12 },
    { id: 205, title: "Atomic Habits", author: "James Clear", loans: 6 },
  ],
  3: [
    { id: 301, title: "Una breve historia del tiempo", author: "Stephen Hawking", loans: 35 },
    { id: 302, title: "El gen egoísta", author: "Richard Dawkins", loans: 22 },
    { id: 303, title: "Cosmos", author: "Carl Sagan", loans: 19 },
    { id: 304, title: "La realidad oculta", author: "Brian Greene", loans: 14 },
    { id: 305, title: "El origen de las especies", author: "Charles Darwin", loans: 9 },
  ],
  4: [
    { id: 401, title: "Homo Deus", author: "Yuval Noah Harari", loans: 31 },
    { id: 402, title: "Guns, Germs, and Steel", author: "Jared Diamond", loans: 24 },
    { id: 403, title: "The Silk Roads", author: "Peter Frankopan", loans: 16 },
    { id: 404, title: "SPQR", author: "Mary Beard", loans: 11 },
    { id: 405, title: "The History of the Ancient World", author: "Susan Wise Bauer", loans: 7 },
  ],
  5: [
    { id: 501, title: "Clean Code", author: "Robert C. Martin", loans: 29 },
    { id: 502, title: "The Pragmatic Programmer", author: "Andrew Hunt", loans: 21 },
    { id: 503, title: "Design Patterns", author: "Gang of Four", loans: 13 },
    { id: 504, title: "Introduction to Algorithms", author: "Thomas H. Cormen", loans: 10 },
    { id: 505, title: "Code Complete", author: "Steve McConnell", loans: 5 },
  ],
}

const clientsData: Record<
  number,
  Array<{ id: number; name: string; email: string; loanDate: string; returnDate: string | null }>
> = {
  101: [
    { id: 1, name: "María González", email: "maria.g@email.com", loanDate: "2025-01-15", returnDate: null },
    { id: 2, name: "Juan Pérez", email: "juan.p@email.com", loanDate: "2025-01-10", returnDate: "2025-01-20" },
    { id: 3, name: "Ana Martínez", email: "ana.m@email.com", loanDate: "2025-01-05", returnDate: "2025-01-18" },
  ],
  102: [
    { id: 4, name: "Carlos López", email: "carlos.l@email.com", loanDate: "2025-01-12", returnDate: null },
    { id: 5, name: "Laura Sánchez", email: "laura.s@email.com", loanDate: "2025-01-08", returnDate: "2025-01-22" },
  ],
  // Add more client data for other books as needed
}

type ViewLevel = "categories" | "books" | "clients"

export function PrestamosDrillDown() {
  const [viewLevel, setViewLevel] = useState<ViewLevel>("categories")
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null)
  const [selectedBook, setSelectedBook] = useState<number | null>(null)

  const handleCategoryClick = (categoryId: number) => {
    setSelectedCategory(categoryId)
    setViewLevel("books")
  }

  const handleBookClick = (bookId: number) => {
    setSelectedBook(bookId)
    setViewLevel("clients")
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
    if (loans > 20) return "text-green-600"
    if (loans >= 10) return "text-yellow-600"
    return "text-red-600"
  }

  const getStatusBadge = (loans: number) => {
    if (loans > 20) return <Badge className="bg-green-600">Alto</Badge>
    if (loans >= 10) return <Badge className="bg-yellow-600">Medio</Badge>
    return <Badge className="bg-red-600">Bajo</Badge>
  }

  const selectedCategoryName = selectedCategory ? categoriesData.find((c) => c.id === selectedCategory)?.name : ""

  const selectedBookTitle = selectedBook
    ? Object.values(booksData)
        .flat()
        .find((b) => b.id === selectedBook)?.title
    : ""

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>
              {viewLevel === "categories" && "Categorías de Libros"}
              {viewLevel === "books" && `Libros - ${selectedCategoryName}`}
              {viewLevel === "clients" && `Clientes - ${selectedBookTitle}`}
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
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categoriesData.map((category) => (
                <TableRow
                  key={category.id}
                  className="cursor-pointer hover:bg-muted/50 transition-all duration-200 hover:scale-[1.02]"
                  onClick={() => handleCategoryClick(category.id)}
                >
                  <TableCell className="font-medium">{category.name}</TableCell>
                  <TableCell className="text-right">{category.totalLoans}</TableCell>
                  <TableCell>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}

        {viewLevel === "books" && selectedCategory && (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Título</TableHead>
                <TableHead>Autor</TableHead>
                <TableHead className="text-right">Préstamos</TableHead>
                <TableHead className="text-center">Estado</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {booksData[selectedCategory]?.map((book) => (
                <TableRow
                  key={book.id}
                  className="cursor-pointer hover:bg-muted/50 transition-all duration-200"
                  onClick={() => handleBookClick(book.id)}
                >
                  <TableCell className="font-medium">{book.title}</TableCell>
                  <TableCell className="text-muted-foreground">{book.author}</TableCell>
                  <TableCell className="text-right">
                    <span className={getStatusColor(book.loans)}>{book.loans}</span>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex items-center justify-center gap-2">
                      <Circle className={`h-3 w-3 fill-current ${getStatusColor(book.loans)}`} />
                      {getStatusBadge(book.loans)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}

        {viewLevel === "clients" && selectedBook && (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Cliente</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Fecha de Préstamo</TableHead>
                <TableHead>Fecha de Devolución</TableHead>
                <TableHead>Estado</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {(clientsData[selectedBook] || []).map((client) => (
                <TableRow key={client.id}>
                  <TableCell className="font-medium">{client.name}</TableCell>
                  <TableCell className="text-muted-foreground">{client.email}</TableCell>
                  <TableCell>{client.loanDate}</TableCell>
                  <TableCell>{client.returnDate || "-"}</TableCell>
                  <TableCell>
                    {client.returnDate ? <Badge variant="outline">Devuelto</Badge> : <Badge>Activo</Badge>}
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
