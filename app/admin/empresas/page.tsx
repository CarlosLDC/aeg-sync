import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { EmpresasTable } from "@/components/admin/tables/empresas-table"
import { EmpresaForm } from "@/components/admin/forms/empresa-form"
import { getEmpresas } from "@/lib/actions/empresas"

export default async function EmpresasPage() {
  const { data: empresas, error } = await getEmpresas()

  if (error) {
    console.error("Error fetching empresas:", error)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Empresas</h1>
          <p className="text-muted-foreground">
            Gestiona las empresas matriz del sistema.
          </p>
        </div>
        <EmpresaForm mode="create" />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Empresas</CardTitle>
          <CardDescription>
            {empresas?.length || 0} empresas encontradas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <EmpresasTable data={empresas || []} />
        </CardContent>
      </Card>
    </div>
  )
}
