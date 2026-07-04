"use client"

import type { ReactNode } from "react"
import { AppProvider } from "./app-context"
import { DeviceFrame } from "./device-frame"
import { Toaster } from "./toaster"

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <AppProvider>
      <DeviceFrame>
        {children}
        <Toaster />
      </DeviceFrame>
    </AppProvider>
  )
}
