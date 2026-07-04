"use client"

import { useEffect, useMemo, useState } from "react"
import { Bell, ChevronRight, Plus, Sparkles, TrendingUp, Users } from "lucide-react"
import Link from "next/link"
import {
  currentUser,
  money,
  products,
  progress,
  type Category,
} from "@/lib/buyhive-data"
import { useApp } from "../app-context"
import { useAppNav } from "@/hooks/use-app-nav"
import { routes } from "@/lib/constants/routes"
import { Logo } from "../logo"
import { SearchBar, CategoryChips } from "../search-chips"
import { ProductCard } from "../product-card"
import { SectionHeader } from "../primitives"
import { EmptyState, GridSkeleton } from "../states"
import { PullToRefresh } from "../pull-to-refresh"

export function HomeScreen() {
  const { pushToast } = useApp()
  const { goExplore, goCreate } = useAppNav()
  const [loading, setLoading] = useState(true)
  const [category, setCategory] = useState<Category | "All">("All")
  const [query, setQuery] = useState("")

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 900)
    return () => clearTimeout(t)
  }, [])

  const filtered = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    return products.filter((p) => {
      const matchesCategory = category === "All" || p.category === category
      const matchesQuery =
        normalizedQuery.length === 0 ||
        p.name.toLowerCase().includes(normalizedQuery) ||
        p.description.toLowerCase().includes(normalizedQuery) ||
        p.category.toLowerCase().includes(normalizedQuery)

      return matchesCategory && matchesQuery
    })
  }, [category, query])

  const trending = filtered.slice(0, 4)
  const recentlyJoined = [...filtered]
    .sort((a, b) => b.joinedMembers - a.joinedMembers)
    .slice(0, 4)
  const recommended = filtered.filter((p) => p.aiReason).slice(0, 4)
  const nearComplete = filtered.filter((p) => progress(p) >= 70).slice(0, 4)

  async function refresh() {
    await new Promise((r) => setTimeout(r, 900))
    pushToast("Deals updated", "info")
  }

  return (
    <div className="bh-page-enter flex h-full flex-col">
      <header className="flex items-center justify-between border-b border-border bg-card px-5 py-3">
        <Logo size="sm" />
        <div className="flex items-center gap-2">
          <Link
            href={routes.notifications}
            aria-label="Notifications"
            className="relative grid h-9 w-9 place-items-center rounded-full border border-border text-foreground"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-error ring-2 ring-card" />
          </Link>
          <button
            type="button"
            onClick={() => goCreate()}
            aria-label="Create group"
            className="grid h-9 w-9 place-items-center rounded-full bg-primary text-primary-foreground shadow-md shadow-primary/25"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </header>

      <PullToRefresh onRefresh={refresh} className="px-5 pb-24 pt-4">
        <div className="space-y-5">
          <div>
            <p className="text-sm text-muted-foreground">Hello,</p>
            <h1 className="text-2xl font-bold text-foreground">{currentUser.firstName} 👋</h1>
          </div>

          <SearchBar
            placeholder="Search groups or deals"
            value={query}
            onChange={setQuery}
          />

          <button
            type="button"
            onClick={() => goExplore()}
            className="flex w-full items-center justify-between rounded-2xl bg-primary p-4 text-left text-primary-foreground shadow-lg shadow-primary/20 transition-transform active:scale-[0.98]"
          >
            <div>
              <p className="text-base font-bold">Explore Deals</p>
              <p className="text-xs text-primary-foreground/85">
                {products.length} active group buys near you
              </p>
            </div>
            <span className="grid h-9 w-9 place-items-center rounded-full bg-primary-foreground/20">
              <ChevronRight className="h-5 w-5" />
            </span>
          </button>

          <div>
            <SectionHeader title="Categories" />
            <CategoryChips active={category} onSelect={setCategory} />
          </div>

          {loading ? (
            <GridSkeleton />
          ) : filtered.length === 0 ? (
            <EmptyState
              icon={<Users className="h-7 w-7" />}
              title={query.trim().length > 0 ? "No search results" : "No groups available in this category."}
              body={
                query.trim().length > 0
                  ? "Try a different keyword or broaden your filters to discover more group buys."
                  : "Try another category or check back soon for fresh deals and campus offers."
              }
            />
          ) : (
            <>
              <section>
                <div className="mb-3 flex items-center gap-1.5">
                  <div className="grid h-6 w-6 place-items-center rounded-md bg-accent text-accent-foreground">
                    <Sparkles className="h-3.5 w-3.5" />
                  </div>
                  <h2 className="text-base font-bold text-foreground">Recommended groups</h2>
                </div>
                <div className="-mx-5 flex gap-3 overflow-x-auto bh-no-scrollbar px-5">
                  {recommended.map((p) => (
                    <div key={p.id} className="w-64 shrink-0">
                      <div className="mb-1.5 flex items-center gap-1 text-xs text-muted-foreground">
                        <Sparkles className="h-3 w-3 text-primary" />
                        <span className="line-clamp-1">AI pick {p.aiReason}</span>
                      </div>
                      <ProductCard product={p} />
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <div className="mb-3 flex items-center gap-1.5">
                  <TrendingUp className="h-4 w-4 text-primary" />
                  <h2 className="text-base font-bold text-foreground">Trending groups</h2>
                </div>
                <div className="-mx-5 flex gap-3 overflow-x-auto bh-no-scrollbar px-5">
                  {trending.map((p) => (
                    <div key={p.id} className="w-44 shrink-0">
                      <ProductCard product={p} />
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <SectionHeader title="Recently joined groups" />
                <div className="grid grid-cols-2 gap-3">
                  {recentlyJoined.map((p) => (
                    <ProductCard key={p.id} product={p} />
                  ))}
                </div>
              </section>

              <section>
                <SectionHeader title="Near complete" action="See all" onAction={() => goExplore()} />
                <div className="grid grid-cols-2 gap-3">
                  {nearComplete.map((p) => (
                    <ProductCard key={p.id} product={p} />
                  ))}
                </div>
              </section>

              <section>
                <SectionHeader title={category === "All" ? "All groups" : category} />
                <div className="grid grid-cols-2 gap-3">
                  {filtered.map((p) => (
                    <ProductCard key={p.id} product={p} />
                  ))}
                </div>
              </section>

              <div className="rounded-2xl border border-dashed border-primary/30 bg-accent/40 p-4 text-center">
                <p className="text-xs font-medium text-muted-foreground">You&apos;ve saved</p>
                <p className="text-2xl font-bold text-primary">{money(currentUser.totalSaved)}</p>
                <p className="text-xs text-muted-foreground">with BuyHive so far</p>
              </div>
            </>
          )}
        </div>
      </PullToRefresh>

      <button
        type="button"
        onClick={() => goCreate()}
        aria-label="Create group"
        className="fixed bottom-24 right-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/25 transition-transform active:scale-95"
      >
        <Plus className="h-6 w-6" />
      </button>
    </div>
  )
}
