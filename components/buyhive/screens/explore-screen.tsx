"use client"

import { useMemo, useState } from "react"
import { Search } from "lucide-react"
import { products, progress, type Category } from "@/lib/buyhive-data"
import { Logo } from "../logo"
import { SearchBar, CategoryChips } from "../search-chips"
import { ProductCard } from "../product-card"
import { SectionHeader } from "../primitives"
import { EmptyState } from "../states"

export function ExploreScreen() {
  const [query, setQuery] = useState("")
  const [category, setCategory] = useState<Category | "All">("All")

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchesCat = category === "All" || p.category === category
      const matchesQuery = p.name.toLowerCase().includes(query.trim().toLowerCase())
      return matchesCat && matchesQuery
    })
  }, [query, category])

  const searching = query.trim().length > 0

  const sections = useMemo(
    () => [
      { title: "Trending", items: filtered.slice(0, 4) },
      { title: "Popular on campus", items: filtered.filter((p) => p.joinedMembers >= 5) },
      { title: "University deals", items: filtered.filter((p) => p.university === "BUET") },
      { title: "Ending soon", items: filtered.filter((p) => progress(p) >= 70) },
    ],
    [filtered],
  )

  return (
    <div className="bh-page-enter flex h-full flex-col">
      <header className="space-y-3 border-b border-border bg-card px-5 pb-3 pt-3">
        <div className="flex items-center justify-between">
          <Logo size="sm" />
          <span className="text-sm font-semibold text-muted-foreground">Explore</span>
        </div>
        <SearchBar placeholder="Search products, groups..." value={query} onChange={setQuery} />
        <CategoryChips active={category} onSelect={setCategory} />
      </header>

      <div className="flex-1 overflow-y-auto bh-no-scrollbar px-5 pb-24 pt-4">
        {filtered.length === 0 ? (
          <EmptyState
            icon={<Search className="h-7 w-7" />}
            title={searching ? "No search results" : "No deals found"}
            body={
              searching
                ? "Try a different keyword, category, or campus filter to uncover more deals."
                : "We couldn't find any group buys matching your current view. Try changing the category or come back later."
            }
          />
        ) : searching ? (
          <section>
            <SectionHeader title={`Results (${filtered.length})`} />
            <div className="grid grid-cols-2 gap-3">
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        ) : (
          <div className="space-y-6">
            {sections
              .filter((s) => s.items.length > 0)
              .map((s) => (
                <section key={s.title}>
                  <SectionHeader title={s.title} />
                  <div className="-mx-5 flex gap-3 overflow-x-auto bh-no-scrollbar px-5">
                    {s.items.map((p) => (
                      <div key={p.id} className="w-44 shrink-0">
                        <ProductCard product={p} />
                      </div>
                    ))}
                  </div>
                </section>
              ))}
          </div>
        )}
      </div>
    </div>
  )
}
