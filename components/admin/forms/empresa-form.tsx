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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { createEmpresa, updateEmpresa } from "@/lib/actions/empresas"
import { toast } from "sonner"
import type { Empresa } from "@/lib/types"

interface EmpresaFormProps {
  mode?: "create" | "edit"
  initialData?: Empresa
  trigger?: React.ReactNode
  onSuccess?: () => void
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export function EmpresaForm({ mode = "create", initialData, trigger, onSuccess, open: controlledOpen, onOpenChange }: EmpresaFormProps) {
  const router = useRouter()
  const [internalOpen, setInternalOpen] = useState(false)
  const open = controlledOpen !== undefined ? controlledOpen : internalOpen
  const setOpen = (value: boolean) => {
    if (controlledOpen === undefined) setInternalOpen(value)
    onOpenChange?.(value)
  }
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    razon_social: initialData?.razon_social || "",
    rif: initialData?.rif || "",
    tipo_contribuyente: initialData?.tipo_contribuyente || "Formal",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      let result
      if (mode === "create") {
        result = await createEmpresa(formData)
      } else if (initialData?.id) {
        result = await updateEmpresa(initialData.id, formData)
      } else {
        throw new Error("No ID provided for update")
      }

      if (result.success) {
        toast.success(mode === "create" ? "Empresa creada exitosamente" : "Empresa actualizada exitosamente")
        setOpen(false)
        router.refresh()
        onSuccess?.()
        if (mode === "create") {
          setFormData({ razon_social: "", rif: "", tipo_contribuyente: "Formal" })
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
              {mode === "create" ? "Nueva Empresa" : "Editar"}
            </span>
          )}
        </DialogTrigger>
      )}
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {mode === "create" ? "Crear Empresa" : "Editar Empresa"}
          </DialogTitle>
          <DialogDescription>
            {mode === "create"
              ? "Completa los datos para crear una nueva empresa."
              : "Modifica los datos de la empresa seleccionada."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="razon_social">Razón Social *</Label>
              <Input
                id="razon_social"
                placeholder="Ej: Empresa C.A."
                value={formData.razon_social}
                onChange={(e) => setFormData({ ...formData, razon_social: e.target.value })}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="rif">RIF *</Label>
              <Input
                id="rif"
                placeholder="Ej: J-12345678-9"
                value={formData.rif}
                onChange={(e) => setFormData({ ...formData, rif: e.target.value })}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="tipo_contribuyente">Tipo de Contribuyente</Label>
              <Select
                value={formData.tipo_contribuyente}
                onValueChange={(value) => setFormData({ ...formData, tipo_contribuyente: value || "Formal" })}>
                <SelectTrigger id="tipo_contribuyente">
                  <SelectValue placeholder="Selecciona un tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Formal">Formal</SelectItem>
                  <SelectItem value="Otro">Otro</SelectItem>
                </SelectContent>
              </Select>
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
