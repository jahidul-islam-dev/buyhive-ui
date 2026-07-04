"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { TAB_ITEMS } from "@/config/navigation"
import { getActiveTab } from "@/lib/constants/routes"
import { cn } from "@/lib/utils"

export function BottomNav() {
  const pathname = usePathname()
  const activeTab = getActiveTab(pathname)

  return (
    <nav
      aria-label="Primary"
      className="absolute inset-x-0 bottom-0 z-30 border-t border-border bg-card/95 backdrop-blur-md"
    >
      <ul className="flex items-stretch justify-around px-1 pb-[env(safe-area-inset-bottom)] pt-1.5">
        {TAB_ITEMS.map((item) => {
          const active = activeTab === item.href
          const Icon = item.icon

          return (
            <li key={item.href} className="flex-1">
              <Link
                href={item.href}
                replace
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex w-full flex-col items-center gap-1 rounded-xl py-1.5 text-[10px] font-medium transition-all duration-200",
                  active ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted/70 hover:text-foreground",
                )}
              >
                <span className="relative">
                  <Icon className={cn("h-5 w-5 transition-transform", active && "scale-110")} />
                  {item.href === "/notifications" && (
                    <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-error ring-2 ring-card" />
                  )}
                </span>
                {item.label}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
