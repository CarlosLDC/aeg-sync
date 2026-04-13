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
import { EmpresaForm } from "../forms/empresa-form"
import { DeleteEmpresaDialog } from "../delete-dialogs/delete-empresa-dialog"
import { PaginatedTable } from "../paginated-table"
import type { Empresa } from "@/lib/types"

interface EmpresasTableProps {
  data: Empresa[]
}

export function EmpresasTable({ data }: EmpresasTableProps) {
  const [editingEmpresa, setEditingEmpresa] = useState<Empresa | null>(null)
  const [deletingEmpresa, setDeletingEmpresa] = useState<Empresa | null>(null)

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
      cell: (empresa: Empresa) => <span className="font-medium">{empresa.id}</span>,
      hidden: true,
    },
    {
      key: "razon_social",
      header: "Razón Social",
      cell: (empresa: Empresa) => empresa.razon_social,
    },
    {
      key: "rif",
      header: "RIF",
      cell: (empresa: Empresa) => empresa.rif,
    },
    {
      key: "tipo_contribuyente",
      header: "Tipo Contribuyente",
      cell: (empresa: Empresa) => (
        <Badge variant="outline">{empresa.tipo_contribuyente}</Badge>
      ),
    },
    {
      key: "created_at",
      header: "Creado",
      cell: (empresa: Empresa) => formatDate(empresa.created_at),
      hidden: true,
    },
    {
      key: "actions",
      header: "",
      cell: (empresa: Empresa) => (
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
                onClick={() => navigator.clipboard.writeText(empresa.rif)}
              >
                <Copy className="mr-2 h-4 w-4" />
                Copiar RIF
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setEditingEmpresa(empresa)}>
                <span className="flex items-center">
                  <Pencil className="mr-2 h-4 w-4" />
                  Editar
                </span>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-destructive"
                onClick={() => setDeletingEmpresa(empresa)}
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
      {editingEmpresa && (
        <EmpresaForm
          mode="edit"
          initialData={editingEmpresa}
          trigger={null}
          open={true}
          onOpenChange={(open) => !open && setEditingEmpresa(null)}
          onSuccess={() => setEditingEmpresa(null)}
        />
      )}
      {deletingEmpresa && (
        <DeleteEmpresaDialog
          empresaId={deletingEmpresa.id}
          empresaNombre={deletingEmpresa.razon_social}
          trigger={null}
          open={true}
          onOpenChange={(open) => !open && setDeletingEmpresa(null)}
          onSuccess={() => setDeletingEmpresa(null)}
        />
      )}
    </>
  )
}
