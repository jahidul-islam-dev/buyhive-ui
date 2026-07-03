"use client"

import { useState } from "react"
import { MessageCircle, PackageOpen } from "lucide-react"
import {
  getProduct,
  money,
  myGroups,
  progress,
  type GroupStatus,
} from "@/lib/buyhive-data"
import { useApp } from "../app-context"
import { Logo } from "../logo"
import { ProgressBar, StatusBadge } from "../primitives"
import { EmptyState } from "../states"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const tabs: { key: GroupStatus; label: string }[] = [
  { key: "active", label: "Active" },
  { key: "pending", label: "Pending" },
  { key: "completed", label: "Completed" },
  { key: "created", label: "Created" },
]

const statusTone: Record<GroupStatus, "primary" | "warning" | "success" | "muted"> = {
  active: "primary",
  pending: "warning",
  completed: "success",
  created: "muted",
}

export function GroupsScreen() {
  const { navigate } = useApp()
  const [tab, setTab] = useState<GroupStatus>("active")

  const list = myGroups.filter((g) => g.status === tab)

  return (
    <div className="flex h-full flex-col">
      <header className="border-b border-border bg-card px-5 pb-2 pt-3">
        <div className="mb-3 flex items-center justify-between">
          <h1 className="text-lg font-bold text-foreground">My Groups</h1>
          <Logo size="sm" showWordmark={false} />
        </div>
        <div className="-mx-5 flex gap-1 overflow-x-auto bh-no-scrollbar px-5">
          {tabs.map((t) => {
            const count = myGroups.filter((g) => g.status === t.key).length
            const active = tab === t.key
            return (
              <button
                key={t.key}
                type="button"
                onClick={() => setTab(t.key)}
                className={cn(
                  "relative shrink-0 px-3 pb-2.5 pt-1 text-sm font-semibold transition-colors",
                  active ? "text-primary" : "text-muted-foreground hover:text-foreground",
                )}
              >
                {t.label}
                <span className="ml-1 text-xs text-muted-foreground">{count}</span>
                {active && (
                  <span className="absolute inset-x-2 bottom-0 h-0.5 rounded-full bg-primary" />
                )}
              </button>
            )
          })}
        </div>
      </header>

      <div className="flex-1 overflow-y-auto bh-no-scrollbar px-5 pb-24 pt-4">
        {list.length === 0 ? (
          <EmptyState
            icon={<PackageOpen className="h-7 w-7" />}
            title="No groups here"
            body={`You have no ${tab} groups yet. Explore deals to join or create one.`}
            action={
              <Button className="mt-1" onClick={() => navigate("explore")}>
                Explore deals
              </Button>
            }
          />
        ) : (
          <div className="space-y-3">
            {list.map((g) => {
              const p = getProduct(g.productId)
              if (!p) return null
              const pct = progress(p)
              return (
                <div
                  key={g.id}
                  className="rounded-2xl border border-border bg-card p-3 shadow-sm"
                >
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => navigate("product", { productId: p.id })}
                      className="h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-muted"
                    >
                      <img
                        src={p.image || "/placeholder.svg"}
                        alt={p.name}
                        className="h-full w-full object-cover"
                        crossOrigin="anonymous"
                      />
                    </button>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <p className="line-clamp-1 text-sm font-semibold text-foreground">{p.name}</p>
                        <StatusBadge tone={statusTone[g.status]}>{g.status}</StatusBadge>
                      </div>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        {money(p.groupPrice)} · {p.joinedMembers}/{p.maxMembers} joined
                      </p>
                      <div className="mt-2 flex items-center gap-2">
                        <ProgressBar
                          value={g.status === "completed" ? 100 : pct}
                          tone={g.status === "completed" ? "success" : "primary"}
                        />
                        <span className="text-xs font-semibold text-muted-foreground">
                          {g.status === "completed" ? 100 : pct}%
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 gap-1.5 bg-transparent"
                      onClick={() => navigate("chat")}
                    >
                      <MessageCircle className="h-4 w-4" /> Chat
                    </Button>
                    <Button
                      size="sm"
                      className="flex-1"
                      onClick={() => navigate("product", { productId: p.id })}
                    >
                      View
                    </Button>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
