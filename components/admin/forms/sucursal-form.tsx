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
import { Checkbox } from "@/components/ui/checkbox"
import { createSucursal, updateSucursal } from "@/lib/actions/sucursales"
import { toast } from "sonner"
import type { Sucursal } from "@/lib/types"

interface SucursalFormProps {
  mode?: "create" | "edit"
  initialData?: Sucursal
  trigger?: React.ReactNode
  onSuccess?: () => void
  empresas?: { id: number; razon_social: string }[]
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export function SucursalForm({ mode = "create", initialData, trigger, onSuccess, empresas = [], open: controlledOpen, onOpenChange }: SucursalFormProps) {
  const router = useRouter()
  const [internalOpen, setInternalOpen] = useState(false)
  const open = controlledOpen !== undefined ? controlledOpen : internalOpen
  const setOpen = (value: boolean) => {
    if (controlledOpen === undefined) setInternalOpen(value)
    onOpenChange?.(value)
  }
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    id_empresa: initialData?.id_empresa || 0,
    ciudad: initialData?.ciudad || "",
    estado: initialData?.estado || "",
    direccion: initialData?.direccion || "",
    telefono: initialData?.telefono || "",
    correo: initialData?.correo || "",
    es_cliente: initialData?.es_cliente || false,
    es_distribuidora: initialData?.es_distribuidora || false,
    es_centro_servicio: initialData?.es_centro_servicio || false,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      let result
      if (mode === "create") {
        result = await createSucursal(formData)
      } else if (initialData?.id) {
        result = await updateSucursal(initialData.id, formData)
      } else {
        throw new Error("No ID provided for update")
      }

      if (result.success) {
        toast.success(mode === "create" ? "Sucursal creada exitosamente" : "Sucursal actualizada exitosamente")
        setOpen(false)
        router.refresh()
        onSuccess?.()
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
              {mode === "create" ? "Nueva Sucursal" : "Editar"}
            </span>
          )}
        </DialogTrigger>
      )}
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>
            {mode === "create" ? "Crear Sucursal" : "Editar Sucursal"}
          </DialogTitle>
          <DialogDescription>
            {mode === "create"
              ? "Completa los datos para crear una nueva sucursal."
              : "Modifica los datos de la sucursal seleccionada."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="id_empresa">Empresa ID *</Label>
                <Input
                  id="id_empresa"
                  type="number"
                  placeholder="Ej: 1"
                  value={formData.id_empresa || ""}
                  onChange={(e) => setFormData({ ...formData, id_empresa: parseInt(e.target.value) || 0 })}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="telefono">Teléfono *</Label>
                <Input
                  id="telefono"
                  placeholder="Ej: 0212-1234567"
                  value={formData.telefono}
                  onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="ciudad">Ciudad *</Label>
                <Input
                  id="ciudad"
                  placeholder="Ej: Caracas"
                  value={formData.ciudad}
                  onChange={(e) => setFormData({ ...formData, ciudad: e.target.value })}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="estado">Estado *</Label>
                <Input
                  id="estado"
                  placeholder="Ej: Distrito Capital"
                  value={formData.estado}
                  onChange={(e) => setFormData({ ...formData, estado: e.target.value })}
                  required
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="direccion">Dirección *</Label>
              <Input
                id="direccion"
                placeholder="Ej: Av. Principal, Edificio Central"
                value={formData.direccion}
                onChange={(e) => setFormData({ ...formData, direccion: e.target.value })}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="correo">Correo *</Label>
              <Input
                id="correo"
                type="email"
                placeholder="Ej: sucursal@empresa.com"
                value={formData.correo}
                onChange={(e) => setFormData({ ...formData, correo: e.target.value })}
                required
              />
            </div>
            <div className="flex gap-4 pt-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="es_cliente"
                  checked={formData.es_cliente}
                  onCheckedChange={(checked: boolean | "indeterminate") => setFormData({ ...formData, es_cliente: checked === true })}
                />
                <Label htmlFor="es_cliente" className="text-sm font-normal">Es Cliente</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="es_distribuidora"
                  checked={formData.es_distribuidora}
                  onCheckedChange={(checked: boolean | "indeterminate") => setFormData({ ...formData, es_distribuidora: checked === true })}
                />
                <Label htmlFor="es_distribuidora" className="text-sm font-normal">Es Distribuidora</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="es_centro_servicio"
                  checked={formData.es_centro_servicio}
                  onCheckedChange={(checked: boolean | "indeterminate") => setFormData({ ...formData, es_centro_servicio: checked === true })}
                />
                <Label htmlFor="es_centro_servicio" className="text-sm font-normal">Es Centro Servicio</Label>
              </div>
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
