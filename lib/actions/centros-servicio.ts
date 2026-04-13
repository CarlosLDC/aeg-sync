"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import type { CentroServicio } from "@/lib/types"

export async function getCentrosServicio(): Promise<{ data: CentroServicio[] | null; error: string | null }> {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from("centros_servicio")
    .select("*")
    .order("created_at", { ascending: false })
  
  if (error) {
    return { data: null, error: error.message }
  }
  
  return { data, error: null }
}

export async function createCentroServicio(
  centro: Omit<CentroServicio, "id" | "created_at">
): Promise<{ success: boolean; error: string | null }> {
  const supabase = await createClient()
  
  const { error } = await supabase
    .from("centros_servicio")
    .insert(centro)
  
  if (error) {
    return { success: false, error: error.message }
  }
  
  revalidatePath("/admin/centros-servicio")
  return { success: true, error: null }
}

export async function deleteCentroServicio(id: number): Promise<{ success: boolean; error: string | null }> {
  const supabase = await createClient()
  
  const { error } = await supabase
    .from("centros_servicio")
    .delete()
    .eq("id", id)
  
  if (error) {
    return { success: false, error: error.message }
  }
  
  revalidatePath("/admin/centros-servicio")
  return { success: true, error: null }
}
