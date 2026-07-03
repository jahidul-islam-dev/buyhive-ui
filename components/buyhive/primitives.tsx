import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

export function ProgressBar({
  value,
  className,
  tone = "primary",
  showLabel = false,
}: {
  value: number
  className?: string
  tone?: "primary" | "success" | "warning"
  showLabel?: boolean
}) {
  const bar =
    tone === "success"
      ? "bg-success"
      : tone === "warning"
        ? "bg-warning"
        : "bg-primary"
  return (
    <div className={cn("w-full", className)}>
      <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
        <div
          className={cn("h-full rounded-full transition-all duration-700 ease-out", bar)}
          style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
        />
      </div>
      {showLabel && (
        <p className="mt-1 text-xs font-medium text-muted-foreground">{value}% funded</p>
      )}
    </div>
  )
}

type BadgeTone = "primary" | "success" | "warning" | "error" | "muted"

export function StatusBadge({
  children,
  tone = "muted",
  className,
}: {
  children: ReactNode
  tone?: BadgeTone
  className?: string
}) {
  const tones: Record<BadgeTone, string> = {
    primary: "bg-accent text-accent-foreground",
    success: "bg-success/15 text-success",
    warning: "bg-warning/15 text-[#b45309] dark:text-warning",
    error: "bg-error/15 text-error",
    muted: "bg-muted text-muted-foreground",
  }
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  )
}

export function SectionHeader({
  title,
  action,
  onAction,
}: {
  title: string
  action?: string
  onAction?: () => void
}) {
  return (
    <div className="mb-3 flex items-center justify-between">
      <h2 className="text-base font-bold text-foreground text-balance">{title}</h2>
      {action && (
        <button
          type="button"
          onClick={onAction}
          className="text-xs font-semibold text-primary hover:underline"
        >
          {action}
        </button>
      )}
    </div>
  )
}
