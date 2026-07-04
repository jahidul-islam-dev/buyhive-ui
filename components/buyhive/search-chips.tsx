"use client"

import { Search } from "lucide-react"
import { categories, type Category } from "@/lib/buyhive-data"
import { cn } from "@/lib/utils"

export function SearchBar({
  placeholder = "Search deals...",
  value,
  onChange,
  onFocus,
  readOnly,
}: {
  placeholder?: string
  value?: string
  onChange?: (v: string) => void
  onFocus?: () => void
  readOnly?: boolean
}) {
  return (
    <div className="relative">
      <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <input
        type="search"
        value={value}
        readOnly={readOnly}
        onFocus={onFocus}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        aria-label="Search"
        className="h-11 w-full rounded-xl border border-border bg-card pl-10 pr-3 text-sm text-foreground shadow-sm outline-none placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
      />
    </div>
  )
}

export function CategoryChips({
  active,
  onSelect,
  includeAll = true,
}: {
  active: Category | "All"
  onSelect: (c: Category | "All") => void
  includeAll?: boolean
}) {
  const items: (Category | "All")[] = includeAll
    ? ["All", ...categories.map((c) => c.label)]
    : categories.map((c) => c.label)
  return (
    <div className="-mx-6 flex gap-2 overflow-x-auto bh-no-scrollbar px-6 py-0.5">
      {items.map((c) => {
        const selected = active === c
        return (
          <button
            key={c}
            type="button"
            onClick={() => onSelect(c)}
            className={cn(
              "shrink-0 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-all duration-200",
              selected
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-card text-muted-foreground hover:text-foreground",
            )}
          >
            {c}
          </button>
        )
      })}
    </div>
  )
}
