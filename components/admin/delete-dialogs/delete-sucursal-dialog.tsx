"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Trash } from "lucide-react"
import { deleteSucursal } from "@/lib/actions/sucursales"
import { toast } from "sonner"

interface DeleteSucursalDialogProps {
  sucursalId: number
  sucursalCiudad: string
  trigger?: React.ReactNode
  onSuccess?: () => void
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export function DeleteSucursalDialog({ sucursalId, sucursalCiudad, trigger, onSuccess, open: controlledOpen, onOpenChange }: DeleteSucursalDialogProps) {
  const router = useRouter()
  const [internalOpen, setInternalOpen] = useState(false)
  const open = controlledOpen !== undefined ? controlledOpen : internalOpen
  const setOpen = (value: boolean) => {
    if (controlledOpen === undefined) setInternalOpen(value)
    onOpenChange?.(value)
  }
  const [loading, setLoading] = useState(false)

  const handleDelete = async () => {
    setLoading(true)
    
    try {
      const result = await deleteSucursal(sucursalId)
      
      if (result.success) {
        toast.success("Sucursal eliminada exitosamente")
        setOpen(false)
        router.refresh()
        onSuccess?.()
      } else {
        toast.error(result.error || "Error al eliminar sucursal")
      }
    } catch (error) {
      toast.error("Error inesperado")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {trigger !== null && (
        <DialogTrigger>
          {trigger || (
            <span className="inline-flex items-center justify-center rounded-md bg-destructive px-3 py-2 text-sm font-medium text-destructive-foreground hover:bg-destructive/90 cursor-pointer">
              <Trash className="mr-2 h-4 w-4" />
              Eliminar
            </span>
          )}
        </DialogTrigger>
      )}
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Confirmar eliminación</DialogTitle>
          <DialogDescription>
            ¿Estás seguro de que deseas eliminar la sucursal de <strong>{sucursalCiudad}</strong>? 
            Esta acción no se puede deshacer.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={() => setOpen(false)} disabled={loading}>
            Cancelar
          </Button>
          <Button variant="destructive" onClick={handleDelete} disabled={loading}>
            {loading ? "Eliminando..." : "Eliminar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
