"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import type { Cliente } from "@/lib/types"

export async function getClientes(): Promise<{ data: Cliente[] | null; error: string | null }> {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from("clientes")
    .select("*")
    .order("created_at", { ascending: false })
  
  if (error) {
    return { data: null, error: error.message }
  }
  
  return { data, error: null }
}

export async function createCliente(
  cliente: Omit<Cliente, "id" | "created_at">
): Promise<{ success: boolean; error: string | null }> {
  const supabase = await createClient()
  
  const { error } = await supabase
    .from("clientes")
    .insert(cliente)
  
  if (error) {
    return { success: false, error: error.message }
  }
  
  revalidatePath("/admin/clientes")
  return { success: true, error: null }
}

export async function updateCliente(
  id: number,
  cliente: Partial<Omit<Cliente, "id" | "created_at">>
): Promise<{ success: boolean; error: string | null }> {
  const supabase = await createClient()
  
  const { error } = await supabase
    .from("clientes")
    .update(cliente)
    .eq("id", id)
  
  if (error) {
    return { success: false, error: error.message }
  }
  
  revalidatePath("/admin/clientes")
  return { success: true, error: null }
}

export async function deleteCliente(id: number): Promise<{ success: boolean; error: string | null }> {
  const supabase = await createClient()
  
  const { error } = await supabase
    .from("clientes")
    .delete()
    .eq("id", id)
  
  if (error) {
    return { success: false, error: error.message }
  }
  
  revalidatePath("/admin/clientes")
  return { success: true, error: null }
}
