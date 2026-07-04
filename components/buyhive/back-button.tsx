"use client"

import { ArrowLeft } from "lucide-react"
import { useAppNav } from "@/hooks/use-app-nav"
import { routes } from "@/lib/constants/routes"
import { cn } from "@/lib/utils"

export function BackButton({
  fallback = routes.home,
  className,
  label = "Go back",
}: {
  fallback?: string
  className?: string
  label?: string
}) {
  const { goBack } = useAppNav()

  return (
    <button
      type="button"
      onClick={() => goBack(fallback)}
      aria-label={label}
      className={cn(
        "grid h-9 w-9 place-items-center rounded-full border border-border bg-card text-foreground shadow-sm",
        className,
      )}
    >
      <ArrowLeft className="h-4 w-4" />
    </button>
  )
}
