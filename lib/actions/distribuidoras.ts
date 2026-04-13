"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import type { Distribuidora } from "@/lib/types"

export async function getDistribuidoras(): Promise<{ data: Distribuidora[] | null; error: string | null }> {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from("distribuidoras")
    .select("*")
    .order("created_at", { ascending: false })
  
  if (error) {
    return { data: null, error: error.message }
  }
  
  return { data, error: null }
}

export async function createDistribuidora(
  distribuidora: Omit<Distribuidora, "id" | "created_at">
): Promise<{ success: boolean; error: string | null }> {
  const supabase = await createClient()
  
  const { error } = await supabase
    .from("distribuidoras")
    .insert(distribuidora)
  
  if (error) {
    return { success: false, error: error.message }
  }
  
  revalidatePath("/admin/distribuidoras")
  return { success: true, error: null }
}

export async function deleteDistribuidora(id: number): Promise<{ success: boolean; error: string | null }> {
  const supabase = await createClient()
  
  const { error } = await supabase
    .from("distribuidoras")
    .delete()
    .eq("id", id)
  
  if (error) {
    return { success: false, error: error.message }
  }
  
  revalidatePath("/admin/distribuidoras")
  return { success: true, error: null }
}
