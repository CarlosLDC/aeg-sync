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

interface ProfileFormProps {
  mode?: "create" | "edit"
  initialData?: {
    id?: number
    correo?: string
    rol_usuario?: string
    id_empleado?: number | null
  }
  trigger?: React.ReactNode
  onSuccess?: () => void
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export function ProfileForm({ mode = "create", initialData, trigger, onSuccess, open: controlledOpen, onOpenChange }: ProfileFormProps) {
  const router = useRouter()
  const [internalOpen, setInternalOpen] = useState(false)
  const open = controlledOpen !== undefined ? controlledOpen : internalOpen
  const setOpen = (value: boolean) => {
    if (controlledOpen === undefined) setInternalOpen(value)
    onOpenChange?.(value)
  }
  const [formData, setFormData] = useState({
    correo: initialData?.correo || "",
    rol_usuario: initialData?.rol_usuario || "tecnico",
    id_empleado: initialData?.id_empleado?.toString() || "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement server action
    console.log("Submit:", formData)
    router.refresh()
    onSuccess?.()
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {trigger !== null && (
        <DialogTrigger>
          {trigger || (
            <span className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 cursor-pointer">
              {mode === "create" ? "Nuevo Perfil" : "Editar"}
            </span>
          )}
        </DialogTrigger>
      )}
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {mode === "create" ? "Crear Perfil" : "Editar Perfil"}
          </DialogTitle>
          <DialogDescription>
            {mode === "create"
              ? "Completa los datos para crear un nuevo perfil."
              : "Modifica los datos del perfil seleccionado."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="correo">Correo electrónico</Label>
              <Input
                id="correo"
                type="email"
                placeholder="usuario@ejemplo.com"
                value={formData.correo}
                onChange={(e) =>
                  setFormData({ ...formData, correo: e.target.value })
                }
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="rol">Rol de usuario</Label>
              <Select
                value={formData.rol_usuario}
                onValueChange={(value) =>
                  setFormData({ ...formData, rol_usuario: value || "tecnico" })
                }
              >
                <SelectTrigger id="rol">
                  <SelectValue placeholder="Selecciona un rol" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tecnico">Técnico</SelectItem>
                  <SelectItem value="admin">Administrador</SelectItem>
                  <SelectItem value="supervisor">Supervisor</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="id_empleado">ID Empleado (opcional)</Label>
              <Input
                id="id_empleado"
                type="number"
                placeholder="Ej: 123"
                value={formData.id_empleado || ""}
                onChange={(e) =>
                  setFormData({ ...formData, id_empleado: e.target.value })
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">
              {mode === "create" ? "Crear" : "Guardar cambios"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
