"use client"

import { useEffect, useMemo, useState } from "react"
import {
  CheckCircle2,
  Clock,
  Loader2,
  MessageCircle,
  Share2,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { getProduct, money, myGroups, progress, savings } from "@/lib/buyhive-data"
import { useApp } from "../app-context"
import { useAppNav } from "@/hooks/use-app-nav"
import { BackButton } from "../back-button"
import { ProgressBar, StatusBadge } from "../primitives"
import { EmptyState, InlineLoader } from "../states"

export function ProductScreen({ productId }: { productId: string }) {
  const { pushToast } = useApp()
  const { goGroupChat } = useAppNav()
  const product = getProduct(productId)
  const [joined, setJoined] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [shareState, setShareState] = useState<"idle" | "success">("idle")

  useEffect(() => {
    if (!product) return
    const timeout = window.setTimeout(() => setError(null), 250)
    return () => window.clearTimeout(timeout)
  }, [productId, product])

  if (!product) {
    return (
      <div className="bh-page-enter flex h-full flex-col">
        <header className="px-5 py-3">
          <BackButton />
        </header>
        <div className="px-5 pb-8">
          <EmptyState
            title="Product not found"
            body="This group buy is no longer available or may have been removed."
          />
        </div>
      </div>
    )
  }

  const joinedCount = product.joinedMembers + (joined ? 1 : 0)
  const pct = Math.round((joinedCount / product.maxMembers) * 100)
  const full = joinedCount >= product.maxMembers
  const group = myGroups.find((g) => g.productId === product.id)

  const countdown = useMemo(() => {
    const numeric = Number.parseInt(product.deadline, 10)
    if (!Number.isNaN(numeric)) return `${numeric} days left`
    return product.deadline
  }, [product.deadline])

  function join() {
    if (joined || full) return
    setLoading(true)
    setError(null)

    window.setTimeout(() => {
      setJoined(true)
      setLoading(false)
      pushToast(
        joinedCount + 1 >= product.maxMembers ? "Group completed! 🎉" : "You joined the group!",
      )
    }, 900)
  }

  function openChat() {
    if (group) {
      goGroupChat(group.id)
    } else {
      pushToast("Join the group to access chat", "info")
    }
  }

  function shareGroup() {
    setShareState("success")
    pushToast("Invite link copied", "info")
    window.setTimeout(() => setShareState("idle"), 1600)
  }

  return (
    <div className="flex h-full flex-col">
      <header className="flex items-center justify-between px-5 py-3">
        <BackButton />
        <button
          type="button"
          onClick={shareGroup}
          aria-label="Share"
          className="grid h-9 w-9 place-items-center rounded-full border border-border bg-card text-foreground shadow-sm"
        >
          {shareState === "success" ? (
            <CheckCircle2 className="h-4 w-4 text-success" />
          ) : (
            <Share2 className="h-4 w-4" />
          )}
        </button>
      </header>

      <div className="flex-1 overflow-y-auto bh-no-scrollbar pb-28">
        <div className="relative aspect-[4/3] w-full bg-muted">
          <img
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            className="h-full w-full object-cover"
            crossOrigin="anonymous"
          />
          <div className="absolute left-3 top-3 flex gap-2">
            <StatusBadge tone="primary">{product.category}</StatusBadge>
          </div>
        </div>

        <div className="space-y-5 p-5">
          <div className="rounded-3xl border border-border bg-card p-4 shadow-sm">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h1 className="text-xl font-bold text-foreground text-balance">{product.name}</h1>
                <p className="mt-1 text-sm text-muted-foreground">
                  Hosted by {product.host} · {product.university}
                </p>
              </div>
              <div className="rounded-2xl bg-primary/10 px-3 py-2 text-right">
                <p className="text-[11px] font-medium text-muted-foreground">Group price</p>
                <p className="text-lg font-bold text-primary">{money(product.groupPrice)}</p>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-2">
              <PriceStat label="Original" value={money(product.originalPrice)} strike />
              <PriceStat label="Group price" value={money(product.groupPrice)} accent />
              <PriceStat label="You save" value={money(savings(product))} tone="success" />
            </div>
          </div>

          <div className="rounded-[24px] border border-border bg-card p-4 shadow-sm">
            <div className="mb-3 flex items-center justify-between text-sm">
              <span className="inline-flex items-center gap-1.5 font-semibold text-foreground">
                <Users className="h-4 w-4 text-primary" />
                {joinedCount}/{product.maxMembers} joined
              </span>
              <span className="inline-flex items-center gap-1 text-warning">
                <Clock className="h-4 w-4" />
                {countdown}
              </span>
            </div>
            <ProgressBar value={pct} tone={full ? "success" : pct >= 80 ? "warning" : "primary"} />
            <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
              <span>{product.maxMembers - joinedCount} members needed</span>
              <span>{pct}% funded</span>
            </div>
            <div className="mt-3 flex -space-x-2">
              {Array.from({ length: product.maxMembers }).map((_, i) => (
                <span
                  key={i}
                  className={`grid h-8 w-8 place-items-center rounded-full border-2 border-card text-xs font-semibold ${i < joinedCount
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                    }`}
                >
                  {i < joinedCount ? "✓" : "+"}
                </span>
              ))}
            </div>
          </div>

          {error ? (
            <div className="rounded-2xl border border-error/20 bg-error/10 p-3 text-sm text-error" role="alert">
              {error}
            </div>
          ) : null}

          {product.aiReason && (
            <div className="flex items-start gap-2 rounded-2xl border border-primary/20 bg-accent/50 p-3.5">
              <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <p className="text-sm text-accent-foreground">
                <span className="font-semibold">AI insight:</span> Recommended {product.aiReason}.
              </p>
            </div>
          )}

          <div>
            <h2 className="mb-1.5 text-sm font-bold text-foreground">About this deal</h2>
            <p className="text-sm leading-relaxed text-muted-foreground text-pretty">
              {product.description}
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-xl bg-muted p-3 text-xs text-muted-foreground">
            <ShieldCheck className="h-4 w-4 text-success" />
            Payments are held safely until the group is complete.
          </div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 z-20 flex items-center gap-2 border-t border-border bg-card/95 p-4 backdrop-blur-md">
        <Button
          variant="outline"
          size="icon"
          className="h-12 w-12 shrink-0 bg-transparent"
          aria-label="Chat"
          onClick={openChat}
        >
          <MessageCircle className="h-5 w-5" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="h-12 w-12 shrink-0 bg-transparent"
          aria-label="Share"
          onClick={shareGroup}
        >
          {shareState === "success" ? (
            <CheckCircle2 className="h-5 w-5 text-success" />
          ) : (
            <Share2 className="h-5 w-5" />
          )}
        </Button>
        <Button className="h-12 flex-1 text-base font-semibold" onClick={join} disabled={joined || full || loading}>
          {loading ? (
            <span className="inline-flex items-center gap-2"><Loader2 className="h-4 w-4 animate-spin" />Joining</span>
          ) : full ? (
            "Group full"
          ) : joined ? (
            "Joined ✓"
          ) : (
            "Join Group"
          )}
        </Button>
      </div>
    </div>
  )
}

function PriceStat({
  label,
  value,
  strike,
  accent,
  tone,
}: {
  label: string
  value: string
  strike?: boolean
  accent?: boolean
  tone?: "success"
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-3 text-center shadow-sm">
      <p className="text-[11px] font-medium text-muted-foreground">{label}</p>
      <p
        className={`mt-0.5 text-sm font-bold ${strike
          ? "text-muted-foreground line-through"
          : tone === "success"
            ? "text-success"
            : accent
              ? "text-primary"
              : "text-foreground"
          }`}
      >
        {value}
      </p>
    </div>
  )
}
