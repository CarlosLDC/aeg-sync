import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export default function ConfigPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Configuración</h1>
        <p className="text-muted-foreground">
          Configuración del sistema de administración.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Información del Sistema</CardTitle>
          <CardDescription>Detalles de la base de datos conectada</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-1">
            <p className="text-sm font-medium">Tabla Principal</p>
            <p className="text-sm text-muted-foreground">perfiles</p>
          </div>
          <Separator />
          <div className="grid gap-1">
            <p className="text-sm font-medium">Columnas</p>
            <ul className="text-sm text-muted-foreground list-disc list-inside">
              <li>id (INTEGER)</li>
              <li>id_usuario (TEXT)</li>
              <li>correo (TEXT)</li>
              <li>rol_usuario (TEXT)</li>
              <li>id_empleado (INTEGER, nullable)</li>
              <li>created_at (TIMESTAMP)</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
