"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import type { Sucursal } from "@/lib/types"

export async function getSucursales(): Promise<{ data: Sucursal[] | null; error: string | null }> {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from("sucursales")
    .select("*, empresas(razon_social)")
    .order("created_at", { ascending: false })
  
  if (error) {
    return { data: null, error: error.message }
  }

  // Flatten empresas into razon_social field
  const formattedData = data?.map((item) => ({
    ...item,
    razon_social: item.empresas?.razon_social,
    empresas: undefined,
  })) as Sucursal[]
  
  return { data: formattedData, error: null }
}

export async function getSucursalById(id: number): Promise<{ data: Sucursal | null; error: string | null }> {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from("sucursales")
    .select("*")
    .eq("id", id)
    .single()
  
  if (error) {
    return { data: null, error: error.message }
  }
  
  return { data, error: null }
}

export async function createSucursal(
  sucursal: Omit<Sucursal, "id" | "created_at">
): Promise<{ success: boolean; error: string | null }> {
  const supabase = await createClient()
  
  const { error } = await supabase
    .from("sucursales")
    .insert(sucursal)
  
  if (error) {
    return { success: false, error: error.message }
  }
  
  revalidatePath("/admin/sucursales")
  return { success: true, error: null }
}

export async function updateSucursal(
  id: number,
  sucursal: Partial<Omit<Sucursal, "id" | "created_at">>
): Promise<{ success: boolean; error: string | null }> {
  const supabase = await createClient()
  
  const { error } = await supabase
    .from("sucursales")
    .update(sucursal)
    .eq("id", id)
  
  if (error) {
    return { success: false, error: error.message }
  }
  
  revalidatePath("/admin/sucursales")
  return { success: true, error: null }
}

export async function deleteSucursal(id: number): Promise<{ success: boolean; error: string | null }> {
  const supabase = await createClient()
  
  const { error } = await supabase
    .from("sucursales")
    .delete()
    .eq("id", id)
  
  if (error) {
    return { success: false, error: error.message }
  }
  
  revalidatePath("/admin/sucursales")
  return { success: true, error: null }
}
