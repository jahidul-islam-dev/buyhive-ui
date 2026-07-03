"use client"

import {
  ArrowLeft,
  BellRing,
  PartyPopper,
  Tag,
  UserPlus,
} from "lucide-react"
import { notifications, type NotificationItem } from "@/lib/buyhive-data"
import { useApp } from "../app-context"
import { cn } from "@/lib/utils"

const groups: NotificationItem["group"][] = ["Today", "Yesterday", "Earlier"]

const iconFor: Record<
  NotificationItem["type"],
  { icon: typeof UserPlus; tone: string }
> = {
  join: { icon: UserPlus, tone: "bg-accent text-accent-foreground" },
  complete: { icon: PartyPopper, tone: "bg-success/15 text-success" },
  reminder: { icon: BellRing, tone: "bg-warning/15 text-[#b45309] dark:text-warning" },
  deal: { icon: Tag, tone: "bg-primary/15 text-primary" },
}

export function NotificationsScreen() {
  const { goBack } = useApp()
  return (
    <div className="flex h-full flex-col">
      <header className="flex items-center gap-3 border-b border-border bg-card px-4 py-3">
        <button
          type="button"
          onClick={goBack}
          aria-label="Go back"
          className="grid h-9 w-9 place-items-center rounded-full text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>
        <h1 className="text-lg font-bold text-foreground">Notifications</h1>
      </header>

      <div className="flex-1 space-y-5 overflow-y-auto bh-no-scrollbar px-5 pb-8 pt-4">
        {groups.map((group) => {
          const items = notifications.filter((n) => n.group === group)
          if (items.length === 0) return null
          return (
            <section key={group}>
              <h2 className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                {group}
              </h2>
              <div className="space-y-2">
                {items.map((n) => {
                  const { icon: Icon, tone } = iconFor[n.type]
                  const unread = n.group === "Today"
                  return (
                    <div
                      key={n.id}
                      className={cn(
                        "flex items-start gap-3 rounded-2xl border border-border bg-card p-3 shadow-sm",
                        unread && "border-primary/20 bg-accent/30",
                      )}
                    >
                      <span className={cn("grid h-10 w-10 shrink-0 place-items-center rounded-xl", tone)}>
                        <Icon className="h-5 w-5" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-foreground">{n.title}</p>
                        <p className="text-xs text-muted-foreground text-pretty">{n.body}</p>
                      </div>
                      <span className="shrink-0 text-[11px] text-muted-foreground">{n.time}</span>
                    </div>
                  )
                })}
              </div>
            </section>
          )
        })}
      </div>
    </div>
  )
}
