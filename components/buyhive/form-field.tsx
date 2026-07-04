"use client"

import { useState, type InputHTMLAttributes, type ReactNode } from "react"
import { Eye, EyeOff } from "lucide-react"
import { cn } from "@/lib/utils"

type FieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string
  icon?: ReactNode
  error?: string
}

export function Field({ label, icon, className, type = "text", id, error, ...props }: FieldProps) {
  const [show, setShow] = useState(false)
  const isPassword = type === "password"
  const inputType = isPassword ? (show ? "text" : "password") : type
  const fieldId = id ?? label.toLowerCase().replace(/\s+/g, "-")

  return (
    <div className="space-y-1.5">
      <label htmlFor={fieldId} className="text-sm font-medium text-foreground">
        {label}
      </label>
      <div className="relative">
        {icon && (
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
            {icon}
          </span>
        )}
        <input
          id={fieldId}
          type={inputType}
          aria-invalid={Boolean(error)}
          className={cn(
            "h-12 w-full rounded-xl border border-input bg-card px-3.5 text-sm text-foreground shadow-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20",
            icon && "pl-10",
            isPassword && "pr-10",
            error && "border-error focus:border-error focus:ring-error/20",
            className,
          )}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShow((s) => !s)}
            aria-label={show ? "Hide password" : "Show password"}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        )}
      </div>
      {error ? <p className="text-xs text-error">{error}</p> : null}
    </div>
  )
}
