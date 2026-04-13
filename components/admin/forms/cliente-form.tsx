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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createCliente, updateCliente } from "@/lib/actions/clientes"
import { toast } from "sonner"
import type { Cliente } from "@/lib/types"

interface ClienteFormProps {
  mode?: "create" | "edit"
  initialData?: Cliente
  trigger?: React.ReactNode
  onSuccess?: () => void
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export function ClienteForm({ mode = "create", initialData, trigger, onSuccess, open: controlledOpen, onOpenChange }: ClienteFormProps) {
  const router = useRouter()
  const [internalOpen, setInternalOpen] = useState(false)
  const open = controlledOpen !== undefined ? controlledOpen : internalOpen
  const setOpen = (value: boolean) => {
    if (controlledOpen === undefined) setInternalOpen(value)
    onOpenChange?.(value)
  }
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    id_sucursal: initialData?.id_sucursal || 0,
    nombre: initialData?.nombre || "",
    contacto: initialData?.contacto || "",
    telefono: initialData?.telefono || "",
    correo: initialData?.correo || "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      let result
      if (mode === "create") {
        result = await createCliente(formData)
      } else if (initialData?.id) {
        result = await updateCliente(initialData.id, formData)
      } else {
        throw new Error("No ID provided for update")
      }

      if (result.success) {
        toast.success(mode === "create" ? "Cliente creado exitosamente" : "Cliente actualizado exitosamente")
        setOpen(false)
        router.refresh()
        onSuccess?.()
        if (mode === "create") {
          setFormData({ id_sucursal: 0, nombre: "", contacto: "", telefono: "", correo: "" })
        }
      } else {
        toast.error(result.error || "Error al procesar la operación")
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
            <span className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 cursor-pointer">
              {mode === "create" ? "Nuevo Cliente" : "Editar"}
            </span>
          )}
        </DialogTrigger>
      )}
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {mode === "create" ? "Crear Cliente" : "Editar Cliente"}
          </DialogTitle>
          <DialogDescription>
            {mode === "create"
              ? "Completa los datos para crear un nuevo cliente."
              : "Modifica los datos del cliente seleccionado."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="id_sucursal">ID Sucursal *</Label>
              <Input
                id="id_sucursal"
                type="number"
                placeholder="Ej: 1"
                value={formData.id_sucursal || ""}
                onChange={(e) => setFormData({ ...formData, id_sucursal: parseInt(e.target.value) || 0 })}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="nombre">Nombre *</Label>
              <Input
                id="nombre"
                placeholder="Ej: Juan Pérez"
                value={formData.nombre}
                onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="contacto">Contacto</Label>
              <Input
                id="contacto"
                placeholder="Ej: Gerente de Ventas"
                value={formData.contacto}
                onChange={(e) => setFormData({ ...formData, contacto: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="telefono">Teléfono</Label>
              <Input
                id="telefono"
                placeholder="Ej: 0414-1234567"
                value={formData.telefono}
                onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="correo">Correo *</Label>
              <Input
                id="correo"
                type="email"
                placeholder="Ej: cliente@email.com"
                value={formData.correo}
                onChange={(e) => setFormData({ ...formData, correo: e.target.value })}
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)} disabled={loading}>
              Cancelar
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Guardando..." : mode === "create" ? "Crear" : "Guardar cambios"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
