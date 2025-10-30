import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import SyncUser from "@/components/SyncUser";
import "./globals.css";
import LayoutClient from "./layout-client";  // 👈 importamos el componente cliente

// --- Fuentes ---
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// --- Metadata ---
export const metadata: Metadata = {
  title: "Bibliotech Dashboard",
  description: "Sistema de gestión de biblioteca",
};

// --- Layout principal ---
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="es">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-gradient-to-b from-gray-50 to-gray-100`}
        >
          {/* 👇 Renderizamos el layout cliente */}
          <LayoutClient>{children}</LayoutClient>
        </body>
      </html>
    </ClerkProvider>
  );
}
