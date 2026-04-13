import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CentrosServicioTable } from "@/components/admin/tables/centros-servicio-table"
import { CentroServicioForm } from "@/components/admin/forms/centro-servicio-form"
import { getCentrosServicio } from "@/lib/actions/centros-servicio"

export default async function CentrosServicioPage() {
  const { data: centros, error } = await getCentrosServicio()

  if (error) {
    console.error("Error fetching centros de servicio:", error)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Centros de Servicio</h1>
          <p className="text-muted-foreground">
            Gestiona los centros de servicio técnico.
          </p>
        </div>
        <CentroServicioForm />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Centros</CardTitle>
          <CardDescription>
            {centros?.length || 0} centros encontrados
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CentrosServicioTable data={centros || []} />
        </CardContent>
      </Card>
    </div>
  )
}
