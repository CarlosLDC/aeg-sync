import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ClientesTable } from "@/components/admin/tables/clientes-table"
import { ClienteForm } from "@/components/admin/forms/cliente-form"
import { getClientes } from "@/lib/actions/clientes"

export default async function ClientesPage() {
  const { data: clientes, error } = await getClientes()

  if (error) {
    console.error("Error fetching clientes:", error)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Clientes</h1>
          <p className="text-muted-foreground">
            Gestiona los clientes del sistema.
          </p>
        </div>
        <ClienteForm mode="create" />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Clientes</CardTitle>
          <CardDescription>
            {clientes?.length || 0} clientes encontrados
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ClientesTable data={clientes || []} />
        </CardContent>
      </Card>
    </div>
  )
}
