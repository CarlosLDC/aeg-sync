import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ProfileForm } from "@/components/admin/profile-form"
import { PerfilesTable } from "@/components/admin/perfiles-table"
import { createClient } from "@/lib/supabase/server"

export default async function PerfilesPage() {
  const supabase = await createClient()
  
  const { data: perfiles, error } = await supabase
    .from("perfiles")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching perfiles:", error)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Perfiles</h1>
          <p className="text-muted-foreground">
            Gestiona los perfiles de usuario del sistema.
          </p>
        </div>
        <ProfileForm mode="create" />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Perfiles</CardTitle>
          <CardDescription>
            {perfiles?.length || 0} perfiles encontrados
          </CardDescription>
        </CardHeader>
        <CardContent>
          <PerfilesTable data={perfiles || []} />
        </CardContent>
      </Card>
    </div>
  )
}
