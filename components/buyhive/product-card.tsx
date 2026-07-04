"use client"

import { Clock, Users } from "lucide-react"
import Link from "next/link"
import { money, progress, savings, type Product } from "@/lib/buyhive-data"
import { routes } from "@/lib/constants/routes"
import { ProgressBar, StatusBadge } from "./primitives"
import { cn } from "@/lib/utils"

export function ProductCard({ product }: { product: Product }) {
  const pct = progress(product)
  const nearComplete = pct >= 80

  return (
    <Link
      href={routes.product(product.id)}
      className="group bh-card-hover block w-full overflow-hidden rounded-2xl border border-border bg-card text-left shadow-sm active:scale-[0.99]"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <img
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          crossOrigin="anonymous"
        />
        <div className="absolute left-2 top-2">
          <StatusBadge tone="success">-{money(savings(product))}</StatusBadge>
        </div>
        {nearComplete && (
          <div className="absolute right-2 top-2">
            <StatusBadge tone="warning">
              <Clock className="h-3 w-3" /> Near full
            </StatusBadge>
          </div>
        )}
      </div>
      <div className="space-y-2 p-3">
        <p className="line-clamp-1 text-sm font-semibold text-foreground">{product.name}</p>
        <div className="flex items-baseline gap-2">
          <span className="text-base font-bold text-primary">{money(product.groupPrice)}</span>
          <span className="text-xs text-muted-foreground line-through">
            {money(product.originalPrice)}
          </span>
        </div>
        <ProgressBar value={pct} tone={nearComplete ? "warning" : "primary"} />
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <Users className="h-3.5 w-3.5" />
            {product.joinedMembers}/{product.maxMembers}
          </span>
          <span className={cn("inline-flex items-center gap-1", nearComplete && "text-warning font-medium")}>
            <Clock className="h-3.5 w-3.5" />
            {product.deadline}
          </span>
        </div>
      </div>
    </Link>
  )
}

export function ProductRow({ product }: { product: Product }) {
  const pct = progress(product)
  return (
    <Link
      href={routes.product(product.id)}
      className="bh-card-hover flex w-full items-center gap-3 rounded-2xl border border-border bg-card p-3 text-left shadow-sm active:scale-[0.99]"
    >
      <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-muted">
        <img
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          className="h-full w-full object-cover"
          crossOrigin="anonymous"
        />
      </div>
      <div className="min-w-0 flex-1 space-y-1.5">
        <p className="line-clamp-1 text-sm font-semibold text-foreground">{product.name}</p>
        <div className="flex items-baseline gap-2">
          <span className="text-sm font-bold text-primary">{money(product.groupPrice)}</span>
          <span className="text-xs text-muted-foreground line-through">
            {money(product.originalPrice)}
          </span>
        </div>
        <ProgressBar value={pct} tone={pct >= 80 ? "warning" : "primary"} />
      </div>
    </Link>
  )
}
