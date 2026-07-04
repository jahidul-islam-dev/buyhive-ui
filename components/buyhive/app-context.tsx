"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react"

type Toast = { id: number; message: string; tone: "success" | "info" | "error" }

type AppState = {
  theme: "light" | "dark"
  toasts: Toast[]
  toggleTheme: () => void
  pushToast: (message: string, tone?: Toast["tone"]) => void
  dismissToast: (id: number) => void
}

const Ctx = createContext<AppState | null>(null)

export function useApp() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error("useApp must be used within AppProvider")
  return ctx
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<"light" | "dark">("light")
  const [toasts, setToasts] = useState<Toast[]>([])

  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle("dark", theme === "dark")
  }, [theme])

  const toggleTheme = useCallback(() => {
    setTheme((t) => (t === "light" ? "dark" : "light"))
  }, [])

  const pushToast = useCallback((message: string, tone: Toast["tone"] = "success") => {
    const id = Date.now() + Math.random()
    setToasts((t) => [...t, { id, message, tone }])
    setTimeout(() => {
      setToasts((t) => t.filter((x) => x.id !== id))
    }, 2600)
  }, [])

  const dismissToast = useCallback((id: number) => {
    setToasts((t) => t.filter((x) => x.id !== id))
  }, [])

  const value = useMemo<AppState>(
    () => ({
      theme,
      toasts,
      toggleTheme,
      pushToast,
      dismissToast,
    }),
    [theme, toasts, toggleTheme, pushToast, dismissToast],
  )

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}
