import { cn } from "@/lib/utils"

export function LogoMark({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "grid place-items-center rounded-2xl bg-primary text-primary-foreground font-bold shadow-sm",
        className,
      )}
      aria-hidden="true"
    >
      BH
    </div>
  )
}

export function Logo({
  className,
  size = "md",
  showWordmark = true,
}: {
  className?: string
  size?: "sm" | "md" | "lg"
  showWordmark?: boolean
}) {
  const mark =
    size === "sm" ? "h-7 w-7 text-xs" : size === "lg" ? "h-12 w-12 text-lg" : "h-9 w-9 text-sm"
  const word =
    size === "sm" ? "text-base" : size === "lg" ? "text-2xl" : "text-lg"
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <LogoMark className={mark} />
      {showWordmark && (
        <span className={cn("font-bold tracking-tight text-foreground", word)}>
          Buy<span className="text-primary">Hive</span>
        </span>
      )}
    </div>
  )
}
