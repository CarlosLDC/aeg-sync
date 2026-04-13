import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SucursalesTable } from "@/components/admin/tables/sucursales-table"
import { SucursalForm } from "@/components/admin/forms/sucursal-form"
import { SucursalesFilter } from "@/components/admin/sucursales-filter"
import { getSucursales } from "@/lib/actions/sucursales"

export default async function SucursalesPage() {
  const { data: sucursales, error } = await getSucursales()

  if (error) {
    console.error("Error fetching sucursales:", error)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Sucursales</h1>
          <p className="text-muted-foreground">
            Gestiona las sucursales, distribuidoras, centros de servicio y clientes.
          </p>
        </div>
        <SucursalForm mode="create" />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Sucursales</CardTitle>
          <CardDescription>
            Filtra por tipo de sucursal
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SucursalesFilter data={sucursales || []} />
        </CardContent>
      </Card>
    </div>
  )
}
