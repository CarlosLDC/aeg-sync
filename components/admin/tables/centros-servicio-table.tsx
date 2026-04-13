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
import { DeleteCentroDialog } from "../delete-dialogs/delete-centro-dialog"
import { PaginatedTable } from "../paginated-table"
import type { CentroServicio } from "@/lib/types"

interface CentrosServicioTableProps {
  data: CentroServicio[]
}

export function CentrosServicioTable({ data }: CentrosServicioTableProps) {
  const [deletingCentro, setDeletingCentro] = useState<CentroServicio | null>(null)

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
      cell: (centro: CentroServicio) => <span className="font-medium">{centro.id}</span>,
      hidden: true,
    },
    {
      key: "id_sucursal",
      header: "Sucursal ID",
      cell: (centro: CentroServicio) => centro.id_sucursal,
    },
    {
      key: "created_at",
      header: "Creado",
      cell: (centro: CentroServicio) => formatDate(centro.created_at),
      hidden: true,
    },
    {
      key: "actions",
      header: "",
      cell: (centro: CentroServicio) => (
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
                onClick={() => setDeletingCentro(centro)}
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
      {deletingCentro && (
        <DeleteCentroDialog
          centroId={deletingCentro.id}
          sucursalId={deletingCentro.id_sucursal}
          trigger={null}
          open={true}
          onOpenChange={(open) => !open && setDeletingCentro(null)}
          onSuccess={() => setDeletingCentro(null)}
        />
      )}
    </>
  )
}
