"use client"

import type { ReactNode } from "react"
import { BottomNav } from "./bottom-nav"

export function TabShell({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex h-full flex-col overflow-hidden bg-background">
      <div className="relative flex-1 overflow-hidden">{children}</div>
      <BottomNav />
    </div>
  )
}

export function StackShell({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex h-full flex-col overflow-hidden bg-background">{children}</div>
  )
}
