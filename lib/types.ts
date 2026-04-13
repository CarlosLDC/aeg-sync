// Database types

export interface Perfil {
  id: number
  id_usuario: string
  correo: string
  rol_usuario: string
  id_empleado: number | null
  created_at: string
}

export interface Empresa {
  id: number
  razon_social: string
  rif: string
  tipo_contribuyente: string
  created_at: string
}

export interface Sucursal {
  id: number
  id_empresa: number
  razon_social?: string
  ciudad: string
  estado: string
  direccion: string
  telefono: string
  correo: string
  es_cliente: boolean
  es_distribuidora: boolean
  es_centro_servicio: boolean
  created_at: string
}

export interface Distribuidora {
  id: number
  id_sucursal: number
  created_at: string
}

export interface CentroServicio {
  id: number
  id_sucursal: number
  created_at: string
}

export interface Cliente {
  id: number
  id_sucursal: number
  nombre: string
  contacto: string
  telefono: string
  correo: string
  created_at: string
}
