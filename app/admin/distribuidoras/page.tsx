import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DistribuidorasTable } from "@/components/admin/tables/distribuidoras-table"
import { DistribuidoraForm } from "@/components/admin/forms/distribuidora-form"
import { getDistribuidoras } from "@/lib/actions/distribuidoras"

export default async function DistribuidorasPage() {
  const { data: distribuidoras, error } = await getDistribuidoras()

  if (error) {
    console.error("Error fetching distribuidoras:", error)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Distribuidoras</h1>
          <p className="text-muted-foreground">
            Gestiona las distribuidoras registradas.
          </p>
        </div>
        <DistribuidoraForm />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Distribuidoras</CardTitle>
          <CardDescription>
            {distribuidoras?.length || 0} distribuidoras encontradas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DistribuidorasTable data={distribuidoras || []} />
        </CardContent>
      </Card>
    </div>
  )
}
