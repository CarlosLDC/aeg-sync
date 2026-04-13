"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Users,
  LayoutDashboard,
  Settings,
  Building2,
  Store,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface NavItem {
  title: string
  href: string
  icon: React.ComponentType<{ className?: string }>
}

interface NavSection {
  title: string
  items: NavItem[]
}

const sections: NavSection[] = [
  {
    title: "General",
    items: [
      { title: "Dashboard", href: "/admin", icon: LayoutDashboard },
      { title: "Perfiles", href: "/admin/perfiles", icon: Users },
    ],
  },
  {
    title: "Gestión",
    items: [
      { title: "Empresas", href: "/admin/empresas", icon: Building2 },
      { title: "Sucursales", href: "/admin/sucursales", icon: Store },
    ],
  },
  {
    title: "Sistema",
    items: [
      { title: "Configuración", href: "/admin/config", icon: Settings },
    ],
  },
]

function NavLink({ item, pathname }: { item: NavItem; pathname: string }) {
  return (
    <Link
      href={item.href}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
        pathname === item.href
          ? "bg-primary text-primary-foreground"
          : "text-muted-foreground hover:bg-muted hover:text-foreground"
      )}
    >
      <item.icon className="h-4 w-4" />
      {item.title}
    </Link>
  )
}

export function Sidebar() {
  const pathname = usePathname()

  return (
    <nav className="flex flex-col gap-6 p-4">
      {sections.map((section) => (
        <div key={section.title} className="flex flex-col gap-1">
          <h3 className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            {section.title}
          </h3>
          <div className="flex flex-col gap-1">
            {section.items.map((item) => (
              <NavLink key={item.href} item={item} pathname={pathname} />
            ))}
          </div>
        </div>
      ))}
    </nav>
  )
}
