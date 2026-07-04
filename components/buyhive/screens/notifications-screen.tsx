"use client"

import { useMemo, useState } from "react"
import { BellOff, BellRing, Check, CheckCheck, PartyPopper, Tag, Trash2, UserPlus } from "lucide-react"
import { type NotificationItem } from "@/lib/buyhive-data"
import { cn } from "@/lib/utils"
import { EmptyState } from "../states"
import { PullToRefresh } from "../pull-to-refresh"

const initialNotifications: NotificationItem[] = [
  {
    id: "n1",
    title: "Rafi joined your group",
    body: "Arduino Uno R3 · 4/6 joined",
    time: "2m ago",
    type: "join",
    group: "Today",
  },
  {
    id: "n2",
    title: "Almost there!",
    body: "ESP32 Dev Board needs just 1 more member",
    time: "1h ago",
    type: "reminder",
    group: "Today",
  },
  {
    id: "n3",
    title: "Group completed 🎉",
    body: "Streaming Premium is fully funded. Delivery on the way!",
    time: "5h ago",
    type: "complete",
    group: "Today",
  },
  {
    id: "n4",
    title: "New deal on your campus",
    body: "Mechanical Keyboard 65% — save ৳750",
    time: "Yesterday",
    type: "deal",
    group: "Yesterday",
  },
  {
    id: "n5",
    title: "Reminder: payment pending",
    body: "Your share for the Keyboard group is due tomorrow",
    time: "Yesterday",
    type: "reminder",
    group: "Yesterday",
  },
  {
    id: "n6",
    title: "Welcome to BuyHive!",
    body: "Start saving by joining your first group buy.",
    time: "3 days ago",
    type: "deal",
    group: "Earlier",
  },
]

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
  const [items, setItems] = useState<NotificationItem[]>(initialNotifications)
  const [refreshing, setRefreshing] = useState(false)

  const grouped = useMemo(() => {
    return groups.map((group) => ({
      group,
      items: items.filter((n) => n.group === group),
    }))
  }, [items])

  function markAsRead(id: string) {
    setItems((current) => current.map((item) => (item.id === id ? { ...item, group: "Earlier" } : item)))
  }

  function deleteItem(id: string) {
    setItems((current) => current.filter((item) => item.id !== id))
  }

  async function refresh() {
    setRefreshing(true)
    await new Promise((resolve) => setTimeout(resolve, 900))
    setItems((current) => current)
    setRefreshing(false)
  }

  return (
    <div className="bh-page-enter flex h-full flex-col">
      <header className="border-b border-border bg-card px-5 py-3">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold text-foreground">Notifications</h1>
            <p className="text-xs text-muted-foreground">Stay updated on your group buys</p>
          </div>
          <span className="rounded-full bg-accent px-2.5 py-1 text-xs font-semibold text-accent-foreground">
            {items.filter((item) => item.group === "Today").length} new
          </span>
        </div>
      </header>

      <PullToRefresh onRefresh={refresh} className="px-5 pb-24 pt-4">
        <div className="space-y-5">
          {items.length === 0 ? (
            <EmptyState
              icon={<BellOff className="h-7 w-7" />}
              title="No notifications"
              body="You’ll see group updates, reminders, and deals here as soon as they arrive."
            />
          ) : (
            grouped.map(({ group, items: groupItems }) => {
              if (groupItems.length === 0) return null
              return (
                <section key={group}>
                  <h2 className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    {group}
                  </h2>
                  <div className="space-y-2">
                    {groupItems.map((n) => {
                      const { icon: Icon, tone } = iconFor[n.type]
                      const unread = n.group === "Today"
                      return (
                        <div
                          key={n.id}
                          className={cn(
                            "rounded-2xl border border-border bg-card p-3 shadow-sm",
                            unread && "border-primary/20 bg-accent/30",
                          )}
                        >
                          <div className="flex items-start gap-3">
                            <span className={cn("grid h-10 w-10 shrink-0 place-items-center rounded-xl", tone)}>
                              <Icon className="h-5 w-5" />
                            </span>
                            <div className="min-w-0 flex-1">
                              <div className="flex items-start justify-between gap-2">
                                <p className="text-sm font-semibold text-foreground">{n.title}</p>
                                <span className="shrink-0 text-[11px] text-muted-foreground">{n.time}</span>
                              </div>
                              <p className="mt-1 text-xs text-muted-foreground text-pretty">{n.body}</p>
                            </div>
                          </div>

                          <div className="mt-3 flex items-center justify-end gap-2">
                            {unread ? (
                              <button
                                type="button"
                                onClick={() => markAsRead(n.id)}
                                className="inline-flex items-center gap-1 rounded-full border border-border px-2.5 py-1.5 text-[11px] font-medium text-foreground"
                              >
                                <CheckCheck className="h-3.5 w-3.5" /> Mark read
                              </button>
                            ) : (
                              <span className="inline-flex items-center gap-1 rounded-full bg-success/10 px-2.5 py-1.5 text-[11px] font-medium text-success">
                                <Check className="h-3.5 w-3.5" /> Read
                              </span>
                            )}
                            <button
                              type="button"
                              onClick={() => deleteItem(n.id)}
                              className="inline-flex items-center gap-1 rounded-full border border-border px-2.5 py-1.5 text-[11px] font-medium text-muted-foreground"
                            >
                              <Trash2 className="h-3.5 w-3.5" /> Delete
                            </button>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </section>
              )
            })
          )}
        </div>
      </PullToRefresh>
    </div>
  )
}
