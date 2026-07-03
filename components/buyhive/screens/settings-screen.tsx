"use client"

import { useState } from "react"
import {
  ArrowLeft,
  Bell,
  ChevronRight,
  Globe,
  HelpCircle,
  LogOut,
  Moon,
  ShieldCheck,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useApp } from "../app-context"
import { cn } from "@/lib/utils"

function Toggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean
  onChange: (v: boolean) => void
  label: string
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={cn(
        "relative h-6 w-11 shrink-0 rounded-full transition-colors",
        checked ? "bg-primary" : "bg-muted-foreground/30",
      )}
    >
      <span
        className={cn(
          "absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform",
          checked ? "translate-x-[22px]" : "translate-x-0.5",
        )}
      />
    </button>
  )
}

export function SettingsScreen() {
  const { goBack, navigate, theme, toggleTheme, pushToast } = useApp()
  const [notifs, setNotifs] = useState(true)
  const [nearby, setNearby] = useState(true)

  return (
    <div className="flex h-full flex-col">
      <header className="flex items-center gap-3 border-b border-border bg-card px-4 py-3">
        <button
          type="button"
          onClick={goBack}
          aria-label="Go back"
          className="grid h-9 w-9 place-items-center rounded-full text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>
        <h1 className="text-lg font-bold text-foreground">Settings</h1>
      </header>

      <div className="flex-1 space-y-6 overflow-y-auto bh-no-scrollbar px-5 pb-8 pt-4">
        <Group title="Appearance">
          <Row icon={Moon} label="Dark mode">
            <Toggle checked={theme === "dark"} onChange={toggleTheme} label="Dark mode" />
          </Row>
        </Group>

        <Group title="Notifications">
          <Row icon={Bell} label="Push notifications">
            <Toggle checked={notifs} onChange={setNotifs} label="Push notifications" />
          </Row>
          <Row icon={Globe} label="Nearby group alerts">
            <Toggle checked={nearby} onChange={setNearby} label="Nearby group alerts" />
          </Row>
        </Group>

        <Group title="Account">
          <Row icon={ShieldCheck} label="Privacy & security" onClick={() => pushToast("Opening privacy", "info")}>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </Row>
          <Row icon={HelpCircle} label="Help & support" onClick={() => pushToast("Opening support", "info")}>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </Row>
        </Group>

        <Button
          variant="outline"
          className="h-12 w-full gap-2 border-error/30 bg-transparent text-error hover:bg-error/10 hover:text-error"
          onClick={() => {
            pushToast("Logged out", "info")
            navigate("onboarding")
          }}
        >
          <LogOut className="h-4 w-4" /> Log out
        </Button>

        <p className="text-center text-xs text-muted-foreground">BuyHive · v1.0.0</p>
      </div>
    </div>
  )
}

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {title}
      </h2>
      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
        {children}
      </div>
    </section>
  )
}

function Row({
  icon: Icon,
  label,
  children,
  onClick,
}: {
  icon: typeof Bell
  label: string
  children: React.ReactNode
  onClick?: () => void
}) {
  const Comp = onClick ? "button" : "div"
  return (
    <Comp
      {...(onClick ? { type: "button", onClick } : {})}
      className="flex w-full items-center gap-3 border-b border-border px-4 py-3.5 text-left last:border-b-0"
    >
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-muted text-foreground">
        <Icon className="h-4 w-4" />
      </span>
      <span className="flex-1 text-sm font-medium text-foreground">{label}</span>
      {children}
    </Comp>
  )
}
