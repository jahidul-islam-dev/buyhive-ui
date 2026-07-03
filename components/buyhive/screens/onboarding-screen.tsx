"use client"

import { PackageCheck, Truck, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useApp } from "../app-context"
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
  const { navigate } = useApp()
  return (
    <div className="flex h-full flex-col overflow-y-auto bh-no-scrollbar px-6 pb-6 pt-8">
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
        <Button className="h-12 w-full text-base font-semibold" onClick={() => navigate("signup")}>
          Sign Up
        </Button>
        <Button
          variant="outline"
          className="h-12 w-full bg-transparent text-base font-semibold"
          onClick={() => navigate("login")}
        >
          Login
        </Button>
        <button
          type="button"
          onClick={() => navigate("home")}
          className="w-full py-2 text-sm font-medium text-muted-foreground hover:text-foreground"
        >
          Continue as Guest
        </button>
      </div>
    </div>
  )
}
