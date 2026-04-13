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
import { SucursalForm } from "../forms/sucursal-form"
import { DeleteSucursalDialog } from "../delete-dialogs/delete-sucursal-dialog"
import { PaginatedTable } from "../paginated-table"
import type { Sucursal } from "@/lib/types"

interface SucursalesTableProps {
  data: Sucursal[]
}

export function SucursalesTable({ data }: SucursalesTableProps) {
  const [editingSucursal, setEditingSucursal] = useState<Sucursal | null>(null)
  const [deletingSucursal, setDeletingSucursal] = useState<Sucursal | null>(null)

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
      cell: (sucursal: Sucursal) => <span className="font-medium">{sucursal.id}</span>,
      hidden: true,
    },
    {
      key: "razon_social",
      header: "Empresa",
      cell: (sucursal: Sucursal) => sucursal.razon_social || "-",
    },
    {
      key: "ciudad",
      header: "Ciudad",
      cell: (sucursal: Sucursal) => sucursal.ciudad,
    },
    {
      key: "estado",
      header: "Estado",
      cell: (sucursal: Sucursal) => sucursal.estado,
    },
    {
      key: "telefono",
      header: "Teléfono",
      cell: (sucursal: Sucursal) => sucursal.telefono,
    },
    {
      key: "tipos",
      header: "Tipos",
      cell: (sucursal: Sucursal) => (
        <div className="flex gap-1 flex-wrap">
          {sucursal.es_cliente && <Badge variant="default" className="text-xs">Cliente</Badge>}
          {sucursal.es_distribuidora && <Badge variant="secondary" className="text-xs">Distrib.</Badge>}
          {sucursal.es_centro_servicio && <Badge variant="outline" className="text-xs">Centro</Badge>}
        </div>
      ),
    },
    {
      key: "created_at",
      header: "Creado",
      cell: (sucursal: Sucursal) => formatDate(sucursal.created_at),
      hidden: true,
    },
    {
      key: "actions",
      header: "",
      cell: (sucursal: Sucursal) => (
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
                onClick={() => navigator.clipboard.writeText(sucursal.correo)}
              >
                <Copy className="mr-2 h-4 w-4" />
                Copiar Correo
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setEditingSucursal(sucursal)}>
                <span className="flex items-center">
                  <Pencil className="mr-2 h-4 w-4" />
                  Editar
                </span>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-destructive"
                onClick={() => setDeletingSucursal(sucursal)}
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
      {editingSucursal && (
        <SucursalForm
          mode="edit"
          initialData={editingSucursal}
          trigger={null}
          open={true}
          onOpenChange={(open) => !open && setEditingSucursal(null)}
          onSuccess={() => setEditingSucursal(null)}
        />
      )}
      {deletingSucursal && (
        <DeleteSucursalDialog
          sucursalId={deletingSucursal.id}
          sucursalCiudad={deletingSucursal.ciudad}
          trigger={null}
          open={true}
          onOpenChange={(open) => !open && setDeletingSucursal(null)}
          onSuccess={() => setDeletingSucursal(null)}
        />
      )}
    </>
  )
}
