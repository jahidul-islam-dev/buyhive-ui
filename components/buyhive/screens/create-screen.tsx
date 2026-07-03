"use client"

import { type FormEvent, useState } from "react"
import { CheckCircle2, ImagePlus, Link2, Loader2, PartyPopper } from "lucide-react"
import { Button } from "@/components/ui/button"
import { money } from "@/lib/buyhive-data"
import { useApp } from "../app-context"
import { Field } from "../form-field"

export function CreateScreen() {
  const { navigate, pushToast } = useApp()
  const [price, setPrice] = useState(750)
  const [groupPrice, setGroupPrice] = useState(560)
  const [members, setMembers] = useState(6)
  const [loading, setLoading] = useState(false)
  const [created, setCreated] = useState(false)

  const savings = Math.max(0, price - groupPrice)

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setCreated(true)
      pushToast("Group created!")
    }, 1100)
  }

  if (created) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-4 px-8 text-center">
        <div className="bh-animate-pop grid h-20 w-20 place-items-center rounded-full bg-success/15 text-success">
          <PartyPopper className="h-9 w-9" />
        </div>
        <h1 className="text-2xl font-bold text-foreground">Group Created!</h1>
        <p className="max-w-xs text-sm text-muted-foreground text-pretty">
          Your group buy is live. Share the invite link with classmates to fill it up faster.
        </p>
        <div className="w-full max-w-xs space-y-2 pt-2">
          <Button className="h-12 w-full font-semibold" onClick={() => navigate("groups")}>
            View my groups
          </Button>
          <Button
            variant="outline"
            className="h-12 w-full bg-transparent font-semibold"
            onClick={() => {
              setCreated(false)
              navigate("home")
            }}
          >
            Back to home
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-full flex-col">
      <header className="border-b border-border bg-card px-5 py-3">
        <h1 className="text-lg font-bold text-foreground">Create a group buy</h1>
        <p className="text-xs text-muted-foreground">Fill in the details and invite others to join</p>
      </header>

      <form onSubmit={onSubmit} className="flex-1 space-y-4 overflow-y-auto bh-no-scrollbar px-5 pb-28 pt-4">
        <button
          type="button"
          onClick={() => pushToast("Image picker opened", "info")}
          className="flex h-32 w-full flex-col items-center justify-center gap-1.5 rounded-2xl border-2 border-dashed border-border bg-muted/50 text-muted-foreground transition-colors hover:border-primary hover:text-primary"
        >
          <ImagePlus className="h-7 w-7" />
          <span className="text-sm font-medium">Add product image</span>
        </button>

        <Field label="Product URL" placeholder="https://store.com/product" icon={<Link2 className="h-4 w-4" />} />
        <Field label="Product name" required placeholder="e.g. Arduino Uno R3" defaultValue="Arduino Uno R3" />

        <div className="grid grid-cols-2 gap-3">
          <Field
            label="Original price"
            type="number"
            required
            value={price}
            onChange={(e) => setPrice(Number(e.target.value) || 0)}
          />
          <Field
            label="Group price"
            type="number"
            required
            value={groupPrice}
            onChange={(e) => setGroupPrice(Number(e.target.value) || 0)}
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Field
            label="Members needed"
            type="number"
            required
            value={members}
            onChange={(e) => setMembers(Number(e.target.value) || 0)}
          />
          <Field label="Deadline" type="date" required />
        </div>

        <div className="rounded-2xl border border-primary/20 bg-accent/50 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-accent-foreground/80">Expected savings</p>
              <p className="text-2xl font-bold text-primary">{money(savings)}</p>
              <p className="text-xs text-accent-foreground/70">per member</p>
            </div>
            <CheckCircle2 className="h-8 w-8 text-success" />
          </div>
        </div>
      </form>

      <div className="absolute inset-x-0 bottom-0 z-20 border-t border-border bg-card/95 p-4 backdrop-blur-md">
        <Button
          type="submit"
          onClick={onSubmit}
          disabled={loading}
          className="h-12 w-full text-base font-semibold"
        >
          {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Create Group"}
        </Button>
      </div>
    </div>
  )
}
