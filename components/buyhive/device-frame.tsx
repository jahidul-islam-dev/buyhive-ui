"use client"

import type { ReactNode } from "react"

export function DeviceFrame({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-dvh w-full bg-muted">
      {/* Mobile: full screen. Desktop: centered phone frame */}
      <div className="mx-auto flex min-h-dvh max-w-md flex-col bg-background shadow-xl md:my-6 md:min-h-0 md:h-[860px] md:max-h-[92dvh] md:rounded-[2.5rem] md:border-8 md:border-foreground/90 md:shadow-2xl md:overflow-hidden">
        {children}
      </div>
    </div>
  )
}
