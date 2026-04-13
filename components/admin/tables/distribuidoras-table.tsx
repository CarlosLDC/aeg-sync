"use client"

import { useState } from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Trash } from "lucide-react"
import { DeleteDistribuidoraDialog } from "../delete-dialogs/delete-distribuidora-dialog"
import { PaginatedTable } from "../paginated-table"
import type { Distribuidora } from "@/lib/types"

interface DistribuidorasTableProps {
  data: Distribuidora[]
}

export function DistribuidorasTable({ data }: DistribuidorasTableProps) {
  const [deletingDistribuidora, setDeletingDistribuidora] = useState<Distribuidora | null>(null)

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
      cell: (distribuidora: Distribuidora) => <span className="font-medium">{distribuidora.id}</span>,
      hidden: true,
    },
    {
      key: "id_sucursal",
      header: "Sucursal ID",
      cell: (distribuidora: Distribuidora) => distribuidora.id_sucursal,
    },
    {
      key: "created_at",
      header: "Creado",
      cell: (distribuidora: Distribuidora) => formatDate(distribuidora.created_at),
      hidden: true,
    },
    {
      key: "actions",
      header: "",
      cell: (distribuidora: Distribuidora) => (
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
                className="text-destructive"
                onClick={() => setDeletingDistribuidora(distribuidora)}
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
      {deletingDistribuidora && (
        <DeleteDistribuidoraDialog
          distribuidoraId={deletingDistribuidora.id}
          sucursalId={deletingDistribuidora.id_sucursal}
          trigger={null}
          open={true}
          onOpenChange={(open) => !open && setDeletingDistribuidora(null)}
          onSuccess={() => setDeletingDistribuidora(null)}
        />
      )}
    </>
  )
}
