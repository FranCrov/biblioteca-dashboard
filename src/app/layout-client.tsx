"use client";

import { usePathname } from "next/navigation";
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import SyncUser from "@/components/SyncUser";

export default function LayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideHeader = pathname === "/"; // 🔹 ocultamos el header solo en la página principal

  return (
    <>
      {!hideHeader && (
        <header className="flex justify-end items-center p-4 gap-4 h-16 bg-white shadow-sm border-b">
          <SignedOut>
            <SignInButton>
              <button className="text-sm font-medium hover:underline">Iniciar sesión</button>
            </SignInButton>
            <SignUpButton>
              <button className="bg-[#6c47ff] text-white rounded-full font-medium text-sm px-4 h-10 hover:bg-[#5a3ce5] transition">
                Registrarse
              </button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <SyncUser />
            <UserButton />
          </SignedIn>
        </header>
      )}
      {children}
    </>
  );
}
