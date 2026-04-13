import { Separator } from "@/components/ui/separator"
import { Toaster } from "@/components/ui/sonner"
import { Sidebar } from "@/components/admin/sidebar"
import { Navbar } from "@/components/admin/navbar"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="flex flex-1">
        <aside className="w-64 border-r bg-background">
          <div className="p-4">
            <Sidebar />
          </div>
        </aside>
        <main className="flex-1 p-6">{children}</main>
      </div>
      <Toaster />
    </div>
  )
}
