"use client"

import { useEffect } from "react"
import { Loader2 } from "lucide-react"
import { useApp } from "../app-context"
import { LogoMark } from "../logo"

export function SplashScreen() {
  const { navigate } = useApp()

  useEffect(() => {
    const t = setTimeout(() => navigate("onboarding"), 2200)
    return () => clearTimeout(t)
  }, [navigate])

  return (
    <div className="flex h-full flex-col items-center justify-center bg-primary px-8 text-center text-primary-foreground">
      <div className="bh-animate-pop">
        <LogoMark className="h-20 w-20 rounded-3xl bg-primary-foreground text-2xl text-primary bh-animate-float" />
      </div>
      <h1 className="mt-6 bh-animate-fade-up text-3xl font-bold tracking-tight" style={{ animationDelay: "0.15s" }}>
        BuyHive
      </h1>
      <p
        className="mt-2 bh-animate-fade-up text-base font-medium text-primary-foreground/85 text-balance"
        style={{ animationDelay: "0.3s" }}
      >
        Buy Together, Save Together
      </p>
      <div
        className="mt-10 flex items-center gap-2 bh-animate-fade-up text-sm text-primary-foreground/80"
        style={{ animationDelay: "0.5s" }}
      >
        <Loader2 className="h-4 w-4 animate-spin" />
        Loading...
      </div>
    </div>
  )
}
