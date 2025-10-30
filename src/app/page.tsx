'use client'

import { SignInButton, SignedOut, SignedIn, UserButton } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { BookOpen } from 'lucide-react'
import { motion } from 'framer-motion' 

export default function HomePage() {
  const router = useRouter()

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center space-y-8 p-6"
      >
        <div className="flex flex-col items-center space-y-4">
          <BookOpen className="h-16 w-16 text-indigo-600" />
          <h1 className="text-4xl font-bold text-gray-800">
            Bienvenido a la Biblioteca Virtual
          </h1>
          <p className="text-gray-600 max-w-md">
            Accedé con tu cuenta para explorar el panel de control, gestionar libros, clientes y préstamos.
          </p>
        </div>

        <SignedOut>
          <div className="flex justify-center">
            <SignInButton mode="modal">
              <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full px-8">
                Iniciar sesión
              </Button>
            </SignInButton>
          </div>
        </SignedOut>

        <SignedIn>
          <div className="flex flex-col items-center space-y-4">
            <UserButton afterSignOutUrl="/" />
            <Button
              onClick={() => router.push('/dashboard')}
              className="bg-green-600 hover:bg-green-700 text-white rounded-full px-8"
            >
              Ir al Dashboard
            </Button>
          </div>
        </SignedIn>
      </motion.div>
    </div>
  )
}
