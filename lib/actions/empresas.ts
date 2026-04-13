"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import type { Empresa } from "@/lib/types"

export async function getEmpresas(): Promise<{ data: Empresa[] | null; error: string | null }> {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from("empresas")
    .select("*")
    .order("created_at", { ascending: false })
  
  if (error) {
    return { data: null, error: error.message }
  }
  
  return { data, error: null }
}

export async function getEmpresaById(id: number): Promise<{ data: Empresa | null; error: string | null }> {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from("empresas")
    .select("*")
    .eq("id", id)
    .single()
  
  if (error) {
    return { data: null, error: error.message }
  }
  
  return { data, error: null }
}

export async function createEmpresa(
  empresa: Omit<Empresa, "id" | "created_at">
): Promise<{ success: boolean; error: string | null }> {
  const supabase = await createClient()
  
  const { error } = await supabase
    .from("empresas")
    .insert(empresa)
  
  if (error) {
    return { success: false, error: error.message }
  }
  
  revalidatePath("/admin/empresas")
  return { success: true, error: null }
}

export async function updateEmpresa(
  id: number,
  empresa: Partial<Omit<Empresa, "id" | "created_at">>
): Promise<{ success: boolean; error: string | null }> {
  const supabase = await createClient()
  
  const { error } = await supabase
    .from("empresas")
    .update(empresa)
    .eq("id", id)
  
  if (error) {
    return { success: false, error: error.message }
  }
  
  revalidatePath("/admin/empresas")
  return { success: true, error: null }
}

export async function deleteEmpresa(id: number): Promise<{ success: boolean; error: string | null }> {
  const supabase = await createClient()
  
  const { error } = await supabase
    .from("empresas")
    .delete()
    .eq("id", id)
  
  if (error) {
    return { success: false, error: error.message }
  }
  
  revalidatePath("/admin/empresas")
  return { success: true, error: null }
}
