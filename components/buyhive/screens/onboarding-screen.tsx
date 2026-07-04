"use client"

import { useState } from "react"
import { Loader2, PackageCheck, Truck, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAppNav } from "@/hooks/use-app-nav"
import { Logo } from "../logo"

const benefits = [
  {
    icon: PackageCheck,
    title: "Save on product costs",
    body: "Buy in bulk with classmates to unlock wholesale prices.",
  },
  {
    icon: Truck,
    title: "Save on delivery",
    body: "Split one shipping fee across the whole group.",
  },
  {
    icon: Users,
    title: "Join student communities",
    body: "Team up with people from your campus and clubs.",
  },
]

export function OnboardingScreen() {
  const { goSignup, goLogin, goHome } = useAppNav()
  const [pendingAction, setPendingAction] = useState<"signup" | "login" | "guest" | null>(null)

  function navigateWithLoading(target: "signup" | "login" | "guest", action: () => void) {
    setPendingAction(target)
    window.setTimeout(() => action(), 300)
  }

  return (
    <div className="bh-page-enter flex h-full flex-col overflow-y-auto bh-no-scrollbar px-6 pb-6 pt-8">
      <div className="flex justify-center">
        <Logo size="lg" />
      </div>

      <div className="mt-6 overflow-hidden rounded-3xl bg-accent">
        <img
          src="/onboarding-hero.png"
          alt="Students shopping together and sharing a delivery"
          className="h-52 w-full object-cover"
          crossOrigin="anonymous"
        />
      </div>

      <h1 className="mt-6 text-center text-2xl font-bold text-foreground text-balance">
        Group buying, made for students
      </h1>

      <ul className="mt-6 space-y-3">
        {benefits.map((b, i) => (
          <li
            key={b.title}
            className="bh-animate-fade-up flex items-start gap-3 rounded-2xl border border-border bg-card p-3.5 shadow-sm"
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent text-accent-foreground">
              <b.icon className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm font-semibold text-foreground">{b.title}</p>
              <p className="text-xs text-muted-foreground text-pretty">{b.body}</p>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-auto space-y-2.5 pt-8">
        <Button
          className="h-12 w-full text-base font-semibold"
          onClick={() => navigateWithLoading("signup", goSignup)}
          disabled={pendingAction !== null}
        >
          {pendingAction === "signup" ? (
            <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Opening register</>
          ) : (
            "Register"
          )}
        </Button>
        <Button
          variant="outline"
          className="h-12 w-full bg-transparent text-base font-semibold"
          onClick={() => navigateWithLoading("login", goLogin)}
          disabled={pendingAction !== null}
        >
          {pendingAction === "login" ? (
            <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Opening login</>
          ) : (
            "Log in"
          )}
        </Button>
        <button
          type="button"
          onClick={() => navigateWithLoading("guest", goHome)}
          disabled={pendingAction !== null}
          className="w-full py-2 text-sm font-medium text-muted-foreground hover:text-foreground disabled:opacity-60"
        >
          {pendingAction === "guest" ? "Loading home..." : "Continue as Guest"}
        </button>
      </div>
    </div>
  )
}
