"use client"

import { Check, Info, X } from "lucide-react"
import { useApp } from "./app-context"
import { cn } from "@/lib/utils"

export function Toaster() {
  const { toasts, dismissToast } = useApp()
  return (
    <div className="pointer-events-none absolute inset-x-0 top-3 z-50 flex flex-col items-center gap-2 px-4">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={cn(
            "bh-animate-fade-up pointer-events-auto flex w-full max-w-sm items-center gap-2.5 rounded-2xl border px-3.5 py-2.5 shadow-lg",
            t.tone === "success" && "border-success/30 bg-success text-success-foreground",
            t.tone === "info" && "border-border bg-card text-card-foreground",
            t.tone === "error" && "border-error/30 bg-error text-error-foreground",
          )}
          role="status"
        >
          <span className="grid h-5 w-5 shrink-0 place-items-center">
            {t.tone === "info" ? <Info className="h-4 w-4" /> : <Check className="h-4 w-4" />}
          </span>
          <p className="flex-1 text-sm font-medium">{t.message}</p>
          <button
            type="button"
            onClick={() => dismissToast(t.id)}
            aria-label="Dismiss"
            className="opacity-70 transition-opacity hover:opacity-100"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ))}
    </div>
  )
}
