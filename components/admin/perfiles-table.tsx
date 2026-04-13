"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Pencil, Trash, Copy } from "lucide-react"
import { ProfileForm } from "./profile-form"
import { DeleteDialog } from "./delete-dialog"
import { PaginatedTable } from "./paginated-table"

interface Perfil {
  id: number
  id_usuario: string
  correo: string
  rol_usuario: string
  id_empleado: number | null
  created_at: string
}

interface PerfilesTableProps {
  data: Perfil[]
}

export function PerfilesTable({ data }: PerfilesTableProps) {
  const [editingPerfil, setEditingPerfil] = useState<Perfil | null>(null)
  const [deletingPerfil, setDeletingPerfil] = useState<Perfil | null>(null)

  const getRoleBadgeVariant = (role: string) => {
    switch (role.toLowerCase()) {
      case "admin":
        return "default"
      case "tecnico":
        return "secondary"
      default:
        return "outline"
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const columns = [
    {
      key: "id",
      header: "ID",
      cell: (perfil: Perfil) => <span className="font-medium">{perfil.id}</span>,
      hidden: true,
    },
    {
      key: "correo",
      header: "Correo",
      cell: (perfil: Perfil) => perfil.correo,
    },
    {
      key: "rol",
      header: "Rol",
      cell: (perfil: Perfil) => (
        <Badge variant={getRoleBadgeVariant(perfil.rol_usuario)}>
          {perfil.rol_usuario}
        </Badge>
      ),
    },
    {
      key: "id_empleado",
      header: "ID Empleado",
      cell: (perfil: Perfil) =>
        perfil.id_empleado ? (
          perfil.id_empleado
        ) : (
          <span className="text-muted-foreground">-</span>
        ),
    },
    {
      key: "created_at",
      header: "Creado",
      cell: (perfil: Perfil) => formatDate(perfil.created_at),
      hidden: true,
    },
    {
      key: "actions",
      header: "",
      cell: (perfil: Perfil) => (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-md hover:bg-accent hover:text-accent-foreground cursor-pointer">
              <span className="sr-only">Abrir menú</span>
              <MoreHorizontal className="h-4 w-4" />
            </span>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuGroup>
              <DropdownMenuLabel>Acciones</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(perfil.id_usuario)}
              >
                <Copy className="mr-2 h-4 w-4" />
                Copiar ID Usuario
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setEditingPerfil(perfil)}>
                <span className="flex items-center">
                  <Pencil className="mr-2 h-4 w-4" />
                  Editar
                </span>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-destructive"
                onClick={() => setDeletingPerfil(perfil)}
              >
                <span className="flex items-center">
                  <Trash className="mr-2 h-4 w-4" />
                  Eliminar
                </span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ]

  return (
    <>
      <PaginatedTable data={data} columns={columns} pageSize={10} />
      {editingPerfil && (
        <ProfileForm
          mode="edit"
          initialData={{
            id: editingPerfil.id,
            correo: editingPerfil.correo,
            rol_usuario: editingPerfil.rol_usuario,
            id_empleado: editingPerfil.id_empleado,
          }}
          trigger={null}
          open={true}
          onOpenChange={(open) => !open && setEditingPerfil(null)}
          onSuccess={() => setEditingPerfil(null)}
        />
      )}
      {deletingPerfil && (
        <DeleteDialog
          perfilId={deletingPerfil.id}
          perfilCorreo={deletingPerfil.correo}
          trigger={null}
          open={true}
          onOpenChange={(open) => !open && setDeletingPerfil(null)}
          onSuccess={() => setDeletingPerfil(null)}
        />
      )}
    </>
  )
}
