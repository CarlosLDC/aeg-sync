"use client"

import { useState } from "react"
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
import { ClienteForm } from "../forms/cliente-form"
import { DeleteClienteDialog } from "../delete-dialogs/delete-cliente-dialog"
import { PaginatedTable } from "../paginated-table"
import type { Cliente } from "@/lib/types"

interface ClientesTableProps {
  data: Cliente[]
}

export function ClientesTable({ data }: ClientesTableProps) {
  const [editingCliente, setEditingCliente] = useState<Cliente | null>(null)
  const [deletingCliente, setDeletingCliente] = useState<Cliente | null>(null)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
  }

  const columns = [
    {
      key: "id",
      header: "ID",
      cell: (cliente: Cliente) => <span className="font-medium">{cliente.id}</span>,
      hidden: true,
    },
    {
      key: "id_sucursal",
      header: "Sucursal ID",
      cell: (cliente: Cliente) => cliente.id_sucursal,
    },
    {
      key: "nombre",
      header: "Nombre",
      cell: (cliente: Cliente) => cliente.nombre,
    },
    {
      key: "contacto",
      header: "Contacto",
      cell: (cliente: Cliente) => cliente.contacto,
    },
    {
      key: "telefono",
      header: "Teléfono",
      cell: (cliente: Cliente) => cliente.telefono,
    },
    {
      key: "created_at",
      header: "Creado",
      cell: (cliente: Cliente) => formatDate(cliente.created_at),
      hidden: true,
    },
    {
      key: "actions",
      header: "",
      cell: (cliente: Cliente) => (
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
                onClick={() => navigator.clipboard.writeText(cliente.correo)}
              >
                <Copy className="mr-2 h-4 w-4" />
                Copiar Correo
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setEditingCliente(cliente)}>
                <span className="flex items-center">
                  <Pencil className="mr-2 h-4 w-4" />
                  Editar
                </span>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-destructive"
                onClick={() => setDeletingCliente(cliente)}
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
      {editingCliente && (
        <ClienteForm
          mode="edit"
          initialData={editingCliente}
          trigger={null}
          open={true}
          onOpenChange={(open) => !open && setEditingCliente(null)}
          onSuccess={() => setEditingCliente(null)}
        />
      )}
      {deletingCliente && (
        <DeleteClienteDialog
          clienteId={deletingCliente.id}
          clienteNombre={deletingCliente.nombre}
          trigger={null}
          open={true}
          onOpenChange={(open) => !open && setDeletingCliente(null)}
          onSuccess={() => setDeletingCliente(null)}
        />
      )}
    </>
  )
}
