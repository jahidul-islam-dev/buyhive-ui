"use client"

import {
  Bookmark,
  ChevronRight,
  Clock3,
  Settings,
  Sparkles,
  Star,
  TrendingUp,
} from "lucide-react"
import { currentUser, money, products } from "@/lib/buyhive-data"
import { useApp } from "../app-context"
import { Logo } from "../logo"
import { ProductRow } from "../product-card"

export function ProfileScreen() {
  const { navigate, pushToast } = useApp()
  const smartDeals = products.slice(1, 3)

  const menu = [
    { icon: Clock3, label: "Purchase history", onClick: () => pushToast("Opening history", "info") },
    { icon: Bookmark, label: "Saved groups", onClick: () => pushToast("Opening saved groups", "info") },
    { icon: Settings, label: "Settings", onClick: () => navigate("settings") },
  ]

  return (
    <div className="flex h-full flex-col">
      <header className="flex items-center justify-between border-b border-border bg-card px-5 py-3">
        <h1 className="text-lg font-bold text-foreground">Profile</h1>
        <span className="rounded-full bg-accent px-2.5 py-1">
          <Logo size="sm" showWordmark={false} />
        </span>
      </header>

      <div className="flex-1 space-y-5 overflow-y-auto bh-no-scrollbar px-5 pb-24 pt-4">
        <div className="flex items-center gap-4">
          <img
            src={currentUser.avatar || "/placeholder.svg"}
            alt=""
            className="h-16 w-16 rounded-full border-2 border-primary/20 object-cover"
            crossOrigin="anonymous"
          />
          <div className="min-w-0">
            <h2 className="text-lg font-bold text-foreground">{currentUser.name}</h2>
            <p className="text-sm text-muted-foreground">{currentUser.university}</p>
            <div className="mt-1 inline-flex items-center gap-1 text-sm">
              <Star className="h-4 w-4 fill-warning text-warning" />
              <span className="font-semibold text-foreground">{currentUser.reputation}</span>
              <span className="text-muted-foreground">· {currentUser.reviews} reviews</span>
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl bg-primary p-5 text-primary-foreground shadow-lg shadow-primary/20">
          <div className="flex items-center gap-1.5 text-sm text-primary-foreground/85">
            <TrendingUp className="h-4 w-4" /> Total saved
          </div>
          <p className="mt-1 text-3xl font-bold">{money(currentUser.totalSaved)}</p>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="rounded-xl bg-primary-foreground/15 p-3">
              <p className="text-xl font-bold">{currentUser.groupsJoined}</p>
              <p className="text-xs text-primary-foreground/85">Groups joined</p>
            </div>
            <div className="rounded-xl bg-primary-foreground/15 p-3">
              <p className="text-xl font-bold">{currentUser.groupsCreated}</p>
              <p className="text-xs text-primary-foreground/85">Groups created</p>
            </div>
          </div>
        </div>

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

        <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
          {menu.map((m, i) => (
            <button
              key={m.label}
              type="button"
              onClick={m.onClick}
              className={`flex w-full items-center gap-3 px-4 py-3.5 text-left transition-colors hover:bg-muted ${
                i > 0 ? "border-t border-border" : ""
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
