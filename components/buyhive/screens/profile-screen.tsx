"use client"

import { useState } from "react"
import {
  Bookmark,
  ChevronRight,
  Clock3,
  HelpCircle,
  LogOut,
  Settings,
  Sparkles,
  Star,
  TrendingUp,
} from "lucide-react"
import { currentUser, money, products } from "@/lib/buyhive-data"
import { useApp } from "../app-context"
import { useAppNav } from "@/hooks/use-app-nav"
import { Logo } from "../logo"
import { ProductRow } from "../product-card"
import { EmptyState } from "../states"
import { SurfaceCard } from "../primitives"

export function ProfileScreen() {
  const { pushToast } = useApp()
  const { goSettings, goOnboarding, goHelp } = useAppNav()
  const [view, setView] = useState<"overview" | "history" | "saved">("overview")
  const smartDeals = products.slice(1, 3)

  const menu = [
    { icon: Clock3, label: "Purchase history", onClick: () => setView("history") },
    { icon: Bookmark, label: "Saved groups", onClick: () => setView("saved") },
    { icon: Settings, label: "Settings", onClick: () => goSettings() },
    { icon: HelpCircle, label: "Help", onClick: () => goHelp() },
    { icon: LogOut, label: "Logout", onClick: () => { pushToast("Logged out", "info"); goOnboarding() } },
  ]

  return (
    <div className="bh-page-enter flex h-full flex-col">
      <header className="flex items-center justify-between border-b border-border bg-card px-5 py-3">
        <h1 className="text-lg font-bold text-foreground">Profile</h1>
        <span className="rounded-full bg-accent px-2.5 py-1">
          <Logo size="sm" showWordmark={false} />
        </span>
      </header>

      <div className="flex-1 space-y-5 overflow-y-auto bh-no-scrollbar px-5 pb-24 pt-4">
        <SurfaceCard>
          <div className="flex items-center gap-4">
            <img
              src={currentUser.avatar || "/placeholder.svg"}
              alt="User avatar"
              className="h-16 w-16 rounded-full border-2 border-primary/20 object-cover"
              crossOrigin="anonymous"
            />
            <div className="min-w-0 flex-1">
              <h2 className="text-lg font-bold text-foreground">{currentUser.name}</h2>
              <p className="text-sm text-muted-foreground">{currentUser.university}</p>
              <div className="mt-1 inline-flex items-center gap-1 text-sm">
                <Star className="h-4 w-4 fill-warning text-warning" />
                <span className="font-semibold text-foreground">{currentUser.reputation}</span>
                <span className="text-muted-foreground">· {currentUser.reviews} reviews</span>
              </div>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-2">
            <div className="rounded-xl bg-muted p-3 text-center">
              <p className="text-lg font-bold text-foreground">{currentUser.groupsJoined}</p>
              <p className="text-[11px] text-muted-foreground">Joined</p>
            </div>
            <div className="rounded-xl bg-muted p-3 text-center">
              <p className="text-lg font-bold text-foreground">{currentUser.groupsCreated}</p>
              <p className="text-[11px] text-muted-foreground">Created</p>
            </div>
            <div className="rounded-xl bg-muted p-3 text-center">
              <p className="text-lg font-bold text-foreground">{currentUser.totalSaved}</p>
              <p className="text-[11px] text-muted-foreground">Saved</p>
            </div>
          </div>
        </SurfaceCard>

        <div className="overflow-hidden rounded-2xl bg-primary p-5 text-primary-foreground shadow-lg shadow-primary/20">
          <div className="flex items-center gap-1.5 text-sm text-primary-foreground/85">
            <TrendingUp className="h-4 w-4" /> Total saved
          </div>
          <p className="mt-1 text-3xl font-bold">{money(currentUser.totalSaved)}</p>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="rounded-xl bg-primary-foreground/15 p-3">
              <p className="text-xl font-bold">{currentUser.groupsJoined}</p>
              <p className="text-xs text-primary-foreground/85">Joined groups</p>
            </div>
            <div className="rounded-xl bg-primary-foreground/15 p-3">
              <p className="text-xl font-bold">{currentUser.groupsCreated}</p>
              <p className="text-xs text-primary-foreground/85">Created groups</p>
            </div>
          </div>
        </div>

        {view === "history" ? (
          <EmptyState
            icon={<Clock3 className="h-7 w-7" />}
            title="No purchase history yet"
            body="Completed orders, receipts, and group payments will appear here as soon as you make your first purchase."
            action={
              <button
                type="button"
                onClick={() => setView("overview")}
                className="rounded-full border border-border bg-background px-3.5 py-2 text-sm font-semibold text-foreground"
              >
                Back to profile
              </button>
            }
          />
        ) : view === "saved" ? (
          <EmptyState
            icon={<Bookmark className="h-7 w-7" />}
            title="No saved items"
            body="Keep track of deals you love by bookmarking them and they’ll show up here in one place."
            action={
              <button
                type="button"
                onClick={() => setView("overview")}
                className="rounded-full border border-border bg-background px-3.5 py-2 text-sm font-semibold text-foreground"
              >
                Back to profile
              </button>
            }
          />
        ) : (
          <section>
            <div className="mb-3 flex items-center gap-1.5">
              <div className="grid h-6 w-6 place-items-center rounded-md bg-accent text-accent-foreground">
                <Sparkles className="h-3.5 w-3.5" />
              </div>
              <h2 className="text-base font-bold text-foreground">Smart deals for you</h2>
            </div>
            <div className="space-y-2">
              {smartDeals.map((p) => (
                <ProductRow key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}

        <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
          {menu.map((m, i) => (
            <button
              key={m.label}
              type="button"
              onClick={m.onClick}
              className={`flex w-full items-center gap-3 px-4 py-3.5 text-left transition-colors hover:bg-muted ${i > 0 ? "border-t border-border" : ""
                }`}
            >
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-muted text-foreground">
                <m.icon className="h-4 w-4" />
              </span>
              <span className="flex-1 text-sm font-medium text-foreground">{m.label}</span>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
