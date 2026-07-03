"use client"

import type { ReactNode } from "react"
import { AlertTriangle, Inbox, Loader2, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"

export function CardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
      <div className="bh-skeleton aspect-[4/3] w-full" />
      <div className="space-y-2 p-3">
        <div className="bh-skeleton h-3.5 w-3/4 rounded" />
        <div className="bh-skeleton h-4 w-1/2 rounded" />
        <div className="bh-skeleton h-2 w-full rounded-full" />
        <div className="bh-skeleton h-3 w-2/3 rounded" />
      </div>
    </div>
  )
}

export function GridSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {Array.from({ length: count }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  )
}

export function InlineLoader({ label = "Loading..." }: { label?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16 text-muted-foreground">
      <Loader2 className="h-7 w-7 animate-spin text-primary" />
      <p className="text-sm font-medium">{label}</p>
    </div>
  )
}

export function EmptyState({
  title = "No groups found",
  body = "Try adjusting your filters or create a new group to get started.",
  icon,
  action,
}: {
  title?: string
  body?: string
  icon?: ReactNode
  action?: ReactNode
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 px-6 py-16 text-center">
      <div className="grid h-16 w-16 place-items-center rounded-2xl bg-muted text-muted-foreground">
        {icon ?? <Inbox className="h-7 w-7" />}
      </div>
      <h3 className="text-base font-bold text-foreground">{title}</h3>
      <p className="max-w-[15rem] text-sm text-muted-foreground text-pretty">{body}</p>
      {action}
    </div>
  )
}

export function ErrorState({ onRetry }: { onRetry?: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 px-6 py-16 text-center">
      <div className="grid h-16 w-16 place-items-center rounded-2xl bg-error/15 text-error">
        <AlertTriangle className="h-7 w-7" />
      </div>
      <h3 className="text-base font-bold text-foreground">Something went wrong</h3>
      <p className="max-w-[15rem] text-sm text-muted-foreground text-pretty">
        We couldn&apos;t load this content. Please check your connection and try again.
      </p>
      {onRetry && (
        <Button variant="outline" onClick={onRetry} className="mt-1 gap-2 bg-transparent">
          <RefreshCw className="h-4 w-4" /> Retry
        </Button>
      )}
    </div>
  )
}
