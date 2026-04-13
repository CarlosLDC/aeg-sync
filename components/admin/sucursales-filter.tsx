"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { SucursalesTable } from "./tables/sucursales-table"
import type { Sucursal } from "@/lib/types"

type FilterType = "todas" | "distribuidoras" | "centros" | "clientes"

interface SucursalesFilterProps {
  data: Sucursal[]
}

export function SucursalesFilter({ data }: SucursalesFilterProps) {
  const [activeFilter, setActiveFilter] = useState<FilterType>("todas")

  const filteredData = data.filter((sucursal) => {
    switch (activeFilter) {
      case "distribuidoras":
        return sucursal.es_distribuidora
      case "centros":
        return sucursal.es_centro_servicio
      case "clientes":
        return sucursal.es_cliente
      default:
        return true
    }
  })

  const counts = {
    todas: data.length,
    distribuidoras: data.filter((s) => s.es_distribuidora).length,
    centros: data.filter((s) => s.es_centro_servicio).length,
    clientes: data.filter((s) => s.es_cliente).length,
  }

  const filters: { key: FilterType; label: string; count: number }[] = [
    { key: "todas", label: "Todas", count: counts.todas },
    { key: "distribuidoras", label: "Distribuidoras", count: counts.distribuidoras },
    { key: "centros", label: "Centros de Servicio", count: counts.centros },
    { key: "clientes", label: "Clientes", count: counts.clientes },
  ]

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {filters.map((filter) => (
          <button
            key={filter.key}
            onClick={() => setActiveFilter(filter.key)}
            className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
              activeFilter === filter.key
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            {filter.label}
            <Badge
              variant={activeFilter === filter.key ? "secondary" : "outline"}
              className="h-5 min-w-5 px-1 text-xs"
            >
              {filter.count}
            </Badge>
          </button>
        ))}
      </div>

      <div className="text-sm text-muted-foreground">
        Mostrando {filteredData.length} de {data.length} sucursales
      </div>

      <SucursalesTable data={filteredData} />
    </div>
  )
}
