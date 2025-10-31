"use client"

import type * as React from "react"
import { BookOpen, Users, BookMarked, RotateCcw, Settings, LayoutDashboard, Library, UserRoundCog } from "lucide-react"

import { NavMain } from "@/components/nav-main"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { title } from "process"

const data = {
  user: {
    name: "Admin",
    email: "admin@biblioteca.com",
    avatar: "/avatars/admin.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Libros",
      url: "/libros",
      icon: BookOpen,
    },
    {
      title: "Clientes",
      url: "/clientes",
      icon: Users,
    },
    {
      title: "Empleados",
      url: "/empleados",
      icon: UserRoundCog,
    },
    {
      title: "Préstamos",
      url: "/prestamos",
      icon: BookMarked,
    },
    {
      title: "Devoluciones",
      url: "/devoluciones",
      icon: RotateCcw,
    },
    {
      title: "Configuración",
      url: "/configuracion",
      icon: Settings,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/dashboard">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Library className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">BiblioTech</span>
                  <span className="truncate text-xs">Sistema de Gestión</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <div className="px-4 py-2 text-sm text-muted-foreground">
          Versión 1.0.0
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
