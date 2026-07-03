"use client"

import { Compass, Home, Plus, User, Users } from "lucide-react"
import { useApp, type Screen } from "./app-context"
import { cn } from "@/lib/utils"

const items: { screen: Screen; label: string; icon: typeof Home }[] = [
  { screen: "home", label: "Home", icon: Home },
  { screen: "explore", label: "Explore", icon: Compass },
  { screen: "create", label: "Create", icon: Plus },
  { screen: "groups", label: "Groups", icon: Users },
  { screen: "profile", label: "Profile", icon: User },
]

export function BottomNav() {
  const { screen, navigate } = useApp()

  return (
    <nav
      aria-label="Primary"
      className="absolute inset-x-0 bottom-0 z-30 border-t border-border bg-card/95 backdrop-blur-md"
    >
      <ul className="flex items-stretch justify-around px-1 pb-[env(safe-area-inset-bottom)] pt-1.5">
        {items.map((item) => {
          const active = screen === item.screen
          const isCreate = item.screen === "create"
          const Icon = item.icon
          if (isCreate) {
            return (
              <li key={item.screen} className="flex flex-1 justify-center">
                <button
                  type="button"
                  onClick={() => navigate(item.screen)}
                  className="flex flex-col items-center gap-1 pt-0.5"
                  aria-label="Create group"
                >
                  <span className="grid h-11 w-11 -translate-y-3 place-items-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/30 transition-transform active:scale-90">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="-mt-2 text-[10px] font-medium text-muted-foreground">
                    {item.label}
                  </span>
                </button>
              </li>
            )
          }
          return (
            <li key={item.screen} className="flex-1">
              <button
                type="button"
                onClick={() => navigate(item.screen)}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex w-full flex-col items-center gap-1 rounded-xl py-1.5 text-[10px] font-medium transition-colors",
                  active ? "text-primary" : "text-muted-foreground hover:text-foreground",
                )}
              >
                <Icon className={cn("h-5 w-5 transition-transform", active && "scale-110")} />
                {item.label}
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
