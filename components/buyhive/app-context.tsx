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

export type Screen =
  | "splash"
  | "onboarding"
  | "login"
  | "signup"
  | "home"
  | "explore"
  | "product"
  | "create"
  | "groups"
  | "chat"
  | "notifications"
  | "profile"
  | "settings"

export const TAB_SCREENS: Screen[] = ["home", "explore", "create", "groups", "profile"]

type NavOptions = { productId?: string }

type Toast = { id: number; message: string; tone: "success" | "info" | "error" }

type AppState = {
  screen: Screen
  productId: string | null
  history: Screen[]
  theme: "light" | "dark"
  toasts: Toast[]
  navigate: (screen: Screen, opts?: NavOptions) => void
  goBack: () => void
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
  const [screen, setScreen] = useState<Screen>("splash")
  const [productId, setProductId] = useState<string | null>(null)
  const [history, setHistory] = useState<Screen[]>([])
  const [theme, setTheme] = useState<"light" | "dark">("light")
  const [toasts, setToasts] = useState<Toast[]>([])

  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle("dark", theme === "dark")
  }, [theme])

  const navigate = useCallback((next: Screen, opts?: NavOptions) => {
    setScreen((prev) => {
      setHistory((h) => (prev === next ? h : [...h, prev]))
      return next
    })
    if (opts?.productId !== undefined) setProductId(opts.productId)
  }, [])

  const goBack = useCallback(() => {
    setHistory((h) => {
      if (h.length === 0) return h
      const copy = [...h]
      const prev = copy.pop()!
      setScreen(prev)
      return copy
    })
  }, [])

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
      screen,
      productId,
      history,
      theme,
      toasts,
      navigate,
      goBack,
      toggleTheme,
      pushToast,
      dismissToast,
    }),
    [screen, productId, history, theme, toasts, navigate, goBack, toggleTheme, pushToast, dismissToast],
  )

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}
